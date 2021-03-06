const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'User created', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.status = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('Email not found');
        error.status = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((correctPassword) => {
      if (!correctPassword) {
        const error = new Error('Wrong password');
        error.status = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id
        },
        'secretKey',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.status = 500;
      }
      next(err);
    });
};

exports.getStatus = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('User not found');
        error.status = 401;
        throw error;
      }
      res.status(200).json({ status: user.status });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.status = 500;
      }
      next(err);
    });
};

exports.updateStatus = (req, res, next) => {
  const userId = req.userId;
  const status = req.body.status;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('User not found');
        error.status = 401;
        throw error;
      }
      user.status = status;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Status update successfull' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.status = 500;
      }
      next(err);
    });
};
