const router = require("express").Router();
const User = require("./users-model.js");
const {checkRoleRenter, checkRoleOwner, restricted} = require("../middleware/middleware.js")

router.get("/owner", checkRoleOwner("owner"), restricted, (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(next)
})

router.get("/renter", checkRoleRenter("renter"), restricted, (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(next)
})

module.exports = router;