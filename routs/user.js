const userRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const getUser = require('../controllers/getUser');
const patchUser = require('../controllers/patchUser');

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
  },
), patchUser);

module.exports = userRouter;
