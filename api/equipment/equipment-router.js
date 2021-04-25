const express = require("express");
const Equipment = require("./equipment-model");
const { checkRoleOwner, restricted } = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject;
    const { name, imgUrl, description, availableForRent } = req.body;
    let equipment = {
      equipment_name: name,
      equipment_img: imgUrl,
      equipment_description: description,
      equipment_available: availableForRent,
      user_id: user_id,
    };
    const added = await Equipment.add(equipment);
    res.status(201).json(added);
  } catch (err) {
    next(err);
  }
});

router.put("/:equipment_id", restricted, checkRoleOwner("owner"), async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject;
    console.log(user_id)
    const { equipment_id } = req.params;
    const { name, imgUrl, description, availableForRent } = req.body;
    const existing = await Equipment.findById(equipment_id);
    if (existing && user_id === existing.user_id) {
      const equipment = {
        equipment_name: name,
        equipment_img: imgUrl,
        equipment_description: description,
        equipment_available: availableForRent,
        user_id: user_id,
      };
      const updated = await Equipment.updateById(equipment_id, equipment);
      res.status(200).json(updated);
    } else if (!existing) {
      res.status(404).json(`equipment with id ${equipment_id} doesn't exist`);
    } else {
      res.status(401).json("user must own the equipment");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:equipment_id", checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject;
    const { equipment_id } = req.params;
    let equipment = await Equipment.findById(equipment_id);
    if (equipment && user_id === equipment.user_id) {
      equipment = await Equipment.deleteById(equipment_id);
      res.status(200).json(equipment);
    } else if (!equipment) {
      res.status(404).json(`equipment with id ${equipment_id} doesn't exist`);
    } else {
      res.status(401).json("user must own the equipment");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
