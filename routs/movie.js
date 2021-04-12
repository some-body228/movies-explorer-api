const movieRouter = require('express').Router();
const validator = require('validator');

const { celebrate, Joi } = require('celebrate');
const getMovies = require('../controllers/getMovies');
const postMovie = require('../controllers/postMovie');
const deleteMovie = require('../controllers/deleteMovie');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('URL не корректный');
      }),
      trailer: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('URL не корректный');
      }),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('URL не корректный');
      }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
), postMovie);
movieRouter.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = movieRouter;
