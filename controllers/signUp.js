
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');

module.exports = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name, email, password: hash,
    })
      .then((user) => {
        // eslint-disable-next-line no-param-reassign
        user.password = undefined;
        res.send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('ValidationError'));
        } else if (err.name === 'MongoError') {
          next(new BadRequestError('пользователь с таким email уже есть'));
        } else {
          next(err);
        }
      });
  });
};