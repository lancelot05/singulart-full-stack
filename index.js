var express = require('express');
var mongoose = require('mongoose');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/auth');
const cors = require('cors');
const User = require('./models/User');
require('./config/passport')(passport);
require('dotenv/config');

const app = express();
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next(); // dont forget this
});
app.use(cors());

app.use(
  session({
    secret: 'Ronaldo is GOAT',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
// app.use(async (req, res, next) => {
//   const user = await User.findById(req.session.userId);
//   req.user = user;
//   next();
// });

app.use('/api/authenticated', (req, res) => {
  res.json(req.session.userId);
});
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get('/api/signin', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.redirect('/api/auth/google');
});

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
