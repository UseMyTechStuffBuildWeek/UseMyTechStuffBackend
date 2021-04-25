const { JWT_SECRET } = require("../secrets/index");
const jwt = require("jsonwebtoken");

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  
  if(!token){
    
    next({status:401, message: 'token required'})
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err){
      next({status: 401, message: 'token invalid'})
    } else {
      req.decodedToken = decodedToken
      console.log(token, decodedToken)
      next()
    }
  })
};

const checkRoleRenter = (role) => (req,res,next) =>{
    if(req.decodedToken.role === role){
        next()
    }else{
        res.status(403).json("Renters only")
    }
}

const checkRoleOwner = (role) => (req,res,next) =>{
    if(req.decodedToken.role === role){
        next()
    }else{
        res.status(403).json("Owners only")
    }
}

module.exports = {
    checkRoleRenter, checkRoleOwner, restricted
}