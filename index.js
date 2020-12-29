// IMPORTS

var express = require('express');
var mongoose = require('mongoose');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
// const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/auth');
const cors = require('cors');
const artworkRouter = require('./routes/artworkRouter');
const path = require('path');
require('./config/passport')(passport);
require('dotenv/config');

// END OF IMPORTS

//MIDDLEWARE

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// END OF MIDDLEWARE

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next(); // dont forget this
// });
// app.use(
//   session({
//     secret: 'Ronaldo is GOAT',
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// ROUTERS

app.use('/api/authenticated', (req, res) => {
  res.json(req.session.userId);
});
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/artworks', artworkRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// END OF ROUTERS

// CONNECTING TO DATABASE

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('connected to database');
});
var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('app started on ', port);
});
