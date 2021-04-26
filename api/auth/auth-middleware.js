const {findBy} = require("../users/users-model")

const checkUsernameExists = async (req, res, next) => {
    try{
      const [user] = await findBy({username: req.body.username})
      if(!user){
        next({status: 401, 
        message: "Invalid credentials"})
      } else {
        req.user = user
        next()
      }
    } 
    catch(err){
      next(err)
    }
  }

  // const checkString =  async (req, res, next) => {
  //   try{
  //     const [user] = await findBy({username: req.body.username})
     
  //       if(!user === ""){
  //         next({status: 401, 
  //           message: "Invalid credentials"})
  //       } else{
  //         req.user = user.map(name => name.toUpperCase())
  //     }
  //   } catch(err){
  //     next(err)
  //   }
  // }

const checkRegistration = (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.role){
        res.status(422).json({message: 'username, role, and password required'})
    } else {
        next()
    }
}

const validateRoleName = (req, res, next) => {
    if(req.body.role === "renter" || req.body.role.trim() === "renter"){
        next()
    } else if (req.body.role === "owner" || req.body.role.trim() === "owner"){
        next()
    } else if (req.body.role.trim().length > 32){
    next({status: 422, 
      message:"Role name can not be longer than 32 chars"})
    } else {
        next({status: 422, message: "Must be a renter or owner"})
    }
}

module.exports = {
    validateRoleName, checkRegistration, checkUsernameExists
}
