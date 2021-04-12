const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NoRightError = require('../errors/NoRightError');

module.exports = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('нет такой карточки');
      }
      if (!(movie.owner === req.user._id)) {
        throw new NoRightError('пользователь может удалить только свою карточку');
      }
      movie.remove();
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};
