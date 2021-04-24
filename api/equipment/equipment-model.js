const db = require("../data/db-config");

function find() {
  return db("equipment as e")
    .join("users as u", "e.user_id", "=", "u.user_id")
    .select("u.user_id as owner_id", "u.username as owner_username", "e.*");
}

function findById(equipment_id) {
  return db("equipment").where("equipment_id", equipment_id).first();
}

async function add(equipment) {
  const [equipment_id] = db("equipment").insert(equipment);
  return db("equipment").findById(equipment_id);
}

async function deleteById(equipment_id) {
  const equipment = await findById(equipment_id);
  await db("equipment").where("equipment_id", equipment_id).del();
  return equipment;
}

async function updateById(equipment_id, changes) {
  await db("equipment").where("equipment_id", equipment_id).update(changes);
  return findById(equipment_id);
}

module.exports = { find, findById, add, deleteById, updateById };
