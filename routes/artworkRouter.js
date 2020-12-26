var express = require('express');
const auth = require('../middleware/auth');
var Artwork = require('../models/Artwork');
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
// artworkRouter.use(fileUpload());

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
    console.log(req.body);
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

module.exports = artworkRouter;
