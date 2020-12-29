var express = require('express');
const auth = require('../middleware/auth');
var Artwork = require('../models/Artwork');
var User = require('../models/User');
var multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, './uploads');
  },
  filename: (req, file, done) => {
    done(null, Date.now() + file.originalname.replace(/\s+/g, ''));
  },
});

const fileFilter = (req, file, done) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    done(null, true);
  } else {
    done({ msg: 'Invalid file format' }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'artworkImg'
);

var artworkRouter = express.Router();

artworkRouter
  .route('/')
  .get((req, res, next) => {
    Artwork.find({})
      .populate('artist')
      .then((artwork) => {
        res.status(200).send(artwork);
      })
      .catch((err) => res.status(400).json({ msg: err }));
  })

  .post(auth, upload, (req, res, next) => {
    const { title, desc, price, category, isFramed, artist } = req.body;
    if (!title || !price || !category || !artist) {
      return res.status(400).json({ msg: 'Please enter all the fields' });
    }
    Artwork.create({
      title: title,
      desc: desc,
      category: category,
      price: price,
      isFramed: isFramed,
      artworkImg: req.file.path.replace(/\\/g, '/'),
      artist: artist,
    })
      .then((artwork) => {
        res.status(201).send(artwork);
      })
      .catch((err) => {
        res.status(500).json({ msg: err });
      });
  });

artworkRouter.route('/favorite').post(auth, (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      const fav = {
        artwork: req.body.id,
      };
      user.favorites.push(fav);
      user
        .save()
        .then((user) => {
          res.status(200).send(user.favorite);
        })
        .catch((err) => next(err));
    })
    .catch((err) => res.status(500).json({ msg: 'Internal server error' }));
});

artworkRouter.route('/favorite/:id').delete(auth, (req, res, next) => {
  const favId = req.params.id;
  const id = [];
  User.findById(req.user.id)
    .then((user) => {
      user.favorites.forEach((fav) => {
        if (fav.artwork == favId) {
          id.push(fav._id);
        }
      });
      if (id == []) {
        return res.status(404).json({ msg: 'Favorite does not exist' });
      }
      user.favorites.id(id[0]).remove();
      user
        .save()
        .then((user) => {
          return res.status(200).send(user.favorite);
        })
        .catch((err) => res.status(400).json({ msg: 'Internal Server Error' }));
    })
    .catch((err) => res.status(500).json({ msg: 'Internal Server Error' }));
});

module.exports = artworkRouter;
