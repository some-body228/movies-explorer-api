const movieRouter = require('express').Router();
const regexp = /^https?:\/\/w*\.?[-\._~:\/?#\[\]@!\$&'()\*\+,;\w\d]+#?$/;
const getMovies = require('../controllers/getMovies')
const postMovie = require('../controllers/postMovie')
const deleteMovie = require('../controllers/deleteMovie')
const { celebrate, Joi, errors } = require('celebrate');


movieRouter.get("/movies", getMovies)
movieRouter.post("/movies", celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regexp),
      trailer: Joi.string().required().pattern(regexp),
      thumbnail: Joi.string().required().pattern(regexp),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
), postMovie)
movieRouter.delete("/movies/:id", deleteMovie)


module.exports = movieRouter;