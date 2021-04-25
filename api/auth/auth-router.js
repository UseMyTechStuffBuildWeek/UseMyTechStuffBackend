const router = require('express').Router();
const bcrypt = require("bcryptjs");
const User = require("../users/users-model.js");
const { JWT_SECRET } = require("../secrets/index.js");
const jwt = require("jsonwebtoken")
const {validateRoleName, checkRegistration, checkUsernameExists } = require("./auth-middleware.js");


router.post("/register", validateRoleName, checkRegistration, (req, res, next) => {
  const { username, role, password } = req.body

  const hash = bcrypt.hashSync(password, 8)

  User.add({ username, role, password: hash })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
})

router.post("/login", checkUsernameExists, (req, res) => {
    const {username, password, role} = req.body

    if(req.body){
      User.findBy({username: username})
        .then(([user]) => {
          if(user && bcrypt.compareSync(password, user.password)){
            const token = buildToken(user)
            res.status(200).json({message: `${username} is back!`, token, role})
          } else{
            res.status(401).json({message: "Invalid credentials"})
          }
        })
        .catch(error => {
          res.status(500).json({message: error.message})
        })
    } else {
      res.status(400).json({
        message: "please provide username and password and the password shoud be alphanumeric"
      })
    }
})

router.delete("/logout", (req, res, next) => {
  if(req.session){
    req.session.destroy(err => {
      if(err){
        res
        .status(400)
        .send('queue the groundhog day trope... you can never leave...')
    } else {
      res.status(200).send('you made it out! good job!')
    }
  })
} else {
  res.end()
}
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

    // const credentials = req.body
  //   if(credentials){
  //     const rounds = process.env.BCRYPT_ROUNDS || 8;
  //     const hash = bcrypt.hashSync(credentials.password, rounds);
  //     credentials.password = hash;
  
  //     User.add(credentials)
  //       .then(user => {
  //         res.status(201).json({data: user});
  //       })
  //       .catch(err => {
  //         res.status(500).json({message: err.message})
  //       })
  //   } else {
  //     res.status(400).json({message: 'username taken'})
  //   }