const db = require("../data/db-config");

async function find() {
  const equipmentList = await db("equipment as e")
    .join("users as u", "e.user_id", "=", "u.user_id")
    .select(
      "u.owner_id",
      "u.username",
      "e.equipment_id",
      "e.equipment_name",
      "e.equipment_img",
      "e.equipment_description",
      "e.renter_id"
    );

  const result = equipmentList.map((equipment) => {
    const { equipment_id } = equipment;
    return {
      owner: { id: equipment.user_id, username: equipment.username },
      id: equipment_id,
      name: equipment.equipment_name,
      imgUrl: equipment.equipment_img,
      description: equipment.equipment_description,
    };
  });
  return result;
}

function findById(equipment_id) {
  return db("equipment").where("equipment_id", equipment_id).first();
}

async function add(equipment) {
  const [equipment_id] = await db("equipment").insert(
    equipment,
    "equipment_id"
  );
  return findById(equipment_id);
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
