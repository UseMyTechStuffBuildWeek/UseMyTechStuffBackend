const express = require("express");
const { checkRoleRenter, checkRoleOwner } = require("../middleware/middleware");
const Equipment = require("../equipment/equipment-model");
const Requests = require("../requests/requests-model");

const router = express.Router();

router.get("/", checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject;
    const requests = await Requests.findByOwnerId(user_id);
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkRoleRenter, async (req, res, next) => {
  try {
    const equipment_id = req.body.equipment_id;
    const user_id = req.decodedToken.subject;
    const request = { user_id: user_id, equipment_id: equipment_id };
    const added = await Requests.add(request);
    res.status(201).json(added);
  } catch (err) {
    next(err);
  }
});

router.delete("/:request_id", async (req, res, next) => {
  try {
    const { request_id } = req.params;
    const request = await Requests.findById(request_id);
    const equipment_id = request.equipment_id;
    if (!request) {
      res.status(404).json(`request with id ${request_id} doesn't exist`);
    } else {
      const equipment = await Equipment.findById(equipment_id);
      const owner_id = equipment.user_id;
      const renter_id = request.user_id;
      const user_id = req.decodedToken.subject;
      if (owner_id === user_id || renter_id === user_id) {
        const deleted = await Requests.deleteById(request_id);
        res.status(200).json(deleted);
      } else {
        res
          .status(401)
          .json("user must be owner of equipment or creator of request");
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
