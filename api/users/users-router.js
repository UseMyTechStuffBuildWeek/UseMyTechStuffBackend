const router = require("express").Router();
const User = require("./users-model.js");
const {checkRoleRenter, checkRoleOwner} = require("../middleware/middleware.js")

router.get("/owner", checkRoleOwner("owner"), (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(next)
})

router.get("/renter", checkRoleRenter("renter"), (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(next)
})

module.exports = router;