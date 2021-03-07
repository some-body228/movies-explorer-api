const Movie = require('../models/movie')
module.exports = (req, res) =>{
  Movie.find({owner: req.user})
    .then(movies =>{
      console.log(movies)
      res.send(movies)
    })
    .catch(err => {
      console.log(err.message)
    })
}