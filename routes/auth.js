var express = require('express');
const passport = require('passport');
var User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const auth = require('../middleware/auth');

//CREATING ROUTER

var authRouter = express.Router();

//GET CURRENT USER
authRouter.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => {
      res.json(user);
    });
});

//SIGNUP

authRouter.post('/signup', (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName) {
    return res
      .status(400)
      .json({ msg: 'Please enter all the required fields' });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: 'Account already Exists' });
    } else {
      bcrypt.genSalt(11, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          User.create({
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName,
          }).then((user) => {
            jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    firstName: user.firstName,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    }
  });
});

//SIGNIN

authRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all the fields' });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect Password' });
      }
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              firstName: user.firstName,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

//GOOGLE

authRouter.post('/google/v2', async (req, res, done) => {
  const { token } = req.body;
  console.log(token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log(ticket);
  const { given_name, family_name, email, picture, sub } = ticket.getPayload();
  console.log(given_name, family_name, email, picture, sub);

  const newUser = new User({
    firstName: given_name,
    lastName: family_name,
    googleId: sub,
    photo: picture,
  });
  try {
    let user = await User.findOne({ googleId: sub });
    if (user) {
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              firstName: user.firstName,
              email: user.email,
            },
          });
        }
      );
    } else {
      user = await User.create(newUser);
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              firstName: user.firstName,
              email: user.email,
            },
          });
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    console.log(res);
    res.redirect('/api/users');
  }
);

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
