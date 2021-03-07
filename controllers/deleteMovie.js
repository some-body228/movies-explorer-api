const Movie = require('../models/movie')
const NotFoundError = require('../errors/NotFoundError');
const NoRightError = require('../errors/NoRightError');

module.exports = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('нет такой карточки');
      }
      // eslint-disable-next-line eqeqeq\
      if (!(movie.owner == req.user._id)) {
        throw new NoRightError('пользователь может удалить только свою карточку');
      }
      Movie.findByIdAndRemove(req.params.id)
        // eslint-disable-next-line no-shadow
        .then((movie) => {
          res.send(movie);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};
