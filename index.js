const mongoose = require("mongoose")
const NotFoundError = require("./errors/NotFoundError")
const express = require("express")
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./midlwears/logger');
const auth = require("./midlwears/auth")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json());


const {PORT = 8380} = process.env
const userRouter = require("./routs/user")
const movieRouter = require("./routs/movie")
const signIn = require('./controllers/signIn')
const signUp = require('./controllers/signUp')
const error = require("./midlwears/erorr")
mongoose.connect("mongodb://localhost:27017/bitfilmsdb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

app.use(requestLogger);

app.post("/signup",  celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), signUp)
app.post("/signin",  celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
), signIn)

app.use(auth)
app.use(movieRouter)
app.use(userRouter)
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());


app.use(error)

app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`)
})