var express = require('express');
const auth = require('../middleware/auth');
var Artwork = require('../models/Artwork');
var multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, './uploads');
  },
  filename: (req, file, done) => {
    done(null, Date.now() + file.originalname);
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
      .catch((err) => res.status(400).send({ msg: err }));
  })
  .post((req, res, next) => {
    if (!req.file) {
      return res.status(400).send('No File Uploaded');
    }
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        if (err.msg === 'Invalid file format') {
          return res.status(400).send(err.msg);
        } else {
          return res.status(500).send('Server Error');
        }
      } else {
        console.log(req.file);
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
          artworkImg: req.file.path,
          artist: artist,
        })
          .then((artwork) => {
            res.status(201).send(artwork);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  });

module.exports = artworkRouter;
