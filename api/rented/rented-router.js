const express = require("express")
const Rented = require("./rented-model");
const {
    checkRoleRenter,
    checkRoleOwner,
    restricted,
  } = require("../middleware/middleware");
const router = express.Router();

router.get("/", restricted, checkRoleRenter, async (req, res, next) => {
    try{
        const user_id = req.decodedToken.subject;
        const rented = await Rented.findRentedItems(user_id)
        res.status(200).json(rented)
    } catch(err){
        next(err)
    }
})

router.post("/", restricted, checkRoleOwner, async (req, res, next) => {
    try{
        const items_rented_id = req.body.items_rented_id
        const user_id = req.decodedToken.subject;
        const rented = {user_id: user_id, items_rented_id: items_rented_id}
        const added = await Rented.addRentedItem(rented);
        res.status(201).json(added)
    } catch(err){
        next(err)
    }
})

router.delete("/:items_rented_id", restricted, checkRoleRenter, async (req, res, next) => {
    try{
        const user_id = req.decodedToken.subject
        const {items_rented_id} = req.params;
        let rented = await Rented.findRentedItems(items_rented_id)
        if(rented && user_id === rented.user_id){
            rented = await Rented.deleteRentedItem(items_rented_id)
            res.status(200).json(rented);
        } else if (!rented){
            res.status(404).json(`item with id ${items_rented_id} does not exist `)
        } else {
            res.status(401).json("must have rented the item")
        }
    }
    catch(err){
        next(err)
    }
})

module.exports = router;
