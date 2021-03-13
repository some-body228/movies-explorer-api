const mongoose = require('mongoose');
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./midlwears/logger');

const auth = require('./midlwears/auth');

const app = express();
let { PORT } = process.env;
if (process.env.NODE_ENV !== 'production') {
  process.env.JWT_SECRET = 'hardbass';
  PORT = 8380;
}

app.use(bodyParser.json());

const userRouter = require('./routs/user');
const movieRouter = require('./routs/movie');
const signIn = require('./controllers/signIn');
const signUp = require('./controllers/signUp');
const error = require('./midlwears/erorr');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signup', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), signUp);
app.post('/signin', celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), signIn);

app.use(auth);
app.use(movieRouter);
app.use(userRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
