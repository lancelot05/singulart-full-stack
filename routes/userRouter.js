var express = require('express');
var User = require('../models/User');

var userRouter = express.Router()

userRouter
.route('/')
.get((req, res, next) => {
    User.find({})
    .then((user) => {
        res.send(user)
    },(err) => console.log('inner error'))
    .catch((err) => console.log('some error', err))
})
.post((req, res, next) => {
    User.create(req.body)
    .then((user) => res.send(user),(err) => console.log('inner error'))
    .catch((err) => console.log("some err"))
})

module.exports = userRouter;