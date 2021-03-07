const mongoose = require("mongoose");
const validator = require("validator");
const moviesSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    }
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    }
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    }
  },
  owner:{
    type: String,
    required: true,
    ref: "user"
  },
  movieId: {
    type: String,
    required: true
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("movie", moviesSchema)
