const router = require('express').Router();
const bcrypt = require("bcryptjs");
// const User = require("../users/users-model.js");
const { JWT_SECRET } = require("../secrets/index.js");
const jwt = require("jsonwebtoken")


router.post("/register", (req, res) => {

})

router.post("/login", (req, res) => {
    
})

function buildToken(user){
    const payload = {
      subject: user.user_id,
      username: user.username,
    }
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }

  module.exports = router;