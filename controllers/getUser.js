const User = require('../models/user')
const NotFoundError = require("../errors/NotFoundError")

module.exports = (req, res, next) =>{
  User.findById(req.user)
    .then(user =>{
      if(!user){
        throw NotFoundError("нет такого пользователя")
      }
      res.send(user)
    })
    .catch(err => {
      next(err)
    })
}