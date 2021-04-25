const router = require("express").Router();
const User = require("./users-model.js");
const {
  checkRoleRenter,
  checkRoleOwner,
  restricted,
} = require("../middleware/middleware.js");

router.get("/owner", restricted, checkRoleOwner, (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/renter", restricted, checkRoleRenter, (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

module.exports = router;
