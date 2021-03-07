const User = require('../models/user')
const Movie = require('../models/movie')
const BadRequestError = require('../errors/BadRequestError')

module.exports = (req, res, next) =>{
  const {country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN} = req.body
    console.log(req.body)
    Movie.create({country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      owner: req.user,
      movieId,
      nameRU,
      nameEN})
    .then(user =>{
      res.send(user)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('ValidationError'));
      } else {
        next(err);
      }
    })
}

