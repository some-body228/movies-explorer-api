const Movie = require('../models/movie');

module.exports = (req, res, next) => {
  Movie.find({ owner: req.user })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};
