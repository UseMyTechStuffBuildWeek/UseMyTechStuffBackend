

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
    checkRoleRenter, checkRoleOwner
}