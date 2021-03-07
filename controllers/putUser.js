const User = require('../models/user')
const NotFoundError = require('../errors/NotFoundError')
module.exports = (req, res, next) =>{
  const {email, password, name} = req.body
  console.log(req.body)
  User.findByIdAndUpdate(req.user._id, {email, password, name})
    .then(user =>{
      if(!user){
        throw new NotFoundError("нет такого пользователя")
      }
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