const userRouter = require('express').Router();

const getUser = require('../controllers/getUser')
const putUser = require('../controllers/putUser')
const { celebrate, Joi, errors } = require('celebrate');



userRouter.get("/users/me", getUser)
userRouter.put("/users/me", celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), putUser)





module.exports = userRouter;