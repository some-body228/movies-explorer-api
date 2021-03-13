require('dotenv').config();
const jwt = require('jsonwebtoken');
const NoAccessError = require('../errors/NoAccessError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new NoAccessError('Необходима авторизация');
  }
  let payload;
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new NoAccessError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
