const express = require("express");
const Equipment = require("./equipment-model");
const { checkRoleOwner } = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject;
    let equipment = { ...req.body, user_id: user_id };
    equipment = await Equipment.add(equipment);
    res.status(201).json(equipment);
  } catch (err) {
    next();
  }
});

router.put("/:equipment_id", checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject;
    const { equipment_id } = req.params;
    let equipment = Equipment.findById(equipment_id);
    if (equipment && user_id === equipment.user_id) {
      equipment = await Equipment.updateById(equipment_id, req.body);
      res.status(200).json(equipment);
    } else if (!equipment) {
      res.status(404).json(`equipment with id ${equipment_id} doesn't exist`);
    } else {
      res.status(401).json("user must own the equipment");
    }
  } catch (err) {
    next();
  }
});

router.delete("/:equipment_id", checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject;
    const { equipment_id } = req.params;
    let equipment = Equipment.findById(equipment_id);
    if (equipment && user_id === equipment.user_id) {
      equipment = await Equipment.deleteById(equipment_id);
      res.status(200).json(equipment);
    } else if (!equipment) {
      res.status(404).json(`equipment with id ${equipment_id} doesn't exist`);
    } else {
      res.status(401).json("user must own the equipment");
    }
  } catch (err) {
    next();
  }
});

router.put("/:equipment_id");

module.exports = router;
