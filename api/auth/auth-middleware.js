// const { JWT_SECRET } = require("../secrets/index")
// const {  } = require("../users/users-model.js");
// const jwt = require('jsonwebtoken');

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
    validateRoleName
}