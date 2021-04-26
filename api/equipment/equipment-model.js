const { request } = require("express");
const db = require("../data/db-config");

async function find() {
  const equipmentList = await db("equipment as e")
    .join("users as u", "e.user_id", "=", "u.user_id")
    .select(
      "u.user_id",
      "u.username",
      "e.equipment_id",
      "e.equipment_name",
      "e.equipment_img",
      "e.equipment_description"
    );

  const result = equipmentList.map((equipment) => {
    return {
      owner: { id: equipment.user_id, username: equipment.username },
      id: equipment.equipment_id,
      name: equipment.equipment_name,
      imgUrl: equipment.equipment_img,
      description: equipment.equipment_description,
      isAvailable: equipment.equipment_available,
    };
  });

  return result;
}

async function findById(equipment_id) {
  const equipment = await db("equipment")
    .where("equipment_id", equipment_id)
    .first();

  return {
    owner: { id: equipment.user_id, username: equipment.username },
    id: equipment.equipment_id,
    name: equipment.equipment_name,
    imgUrl: equipment.equipment_img,
    description: equipment.equipment_description,
    isAvailable: equipment.equipment_available,
  };
}

async function findOwned(owner_id) {
  const storage = {};
  const result = [];

  const table = await db("equipment as e")
    .join("requests as r", "r.equipment_id", "e.equipment_id")
    .select(
      "e.equipment_id",
      "e.equipment_name",
      "e.equipment_description",
      "e.equipment_img",
      "e.equipment_available",
      "r.user_id",
      "r.request_id",
      "r.accepted"
    )
    .where("e.user_id", owner_id);

  table.forEach((row) => {
    const kv = storage[request.equipment_id];
    const request = {
      request_id: row.request_id,
      equipment_id: row.equipment_id,
      renter_id: row.renter_id,
      accepted: row.accepted,
    };
    if (!kv) {
      storage[row.equipment_id] = {
        name: row.equipment_name,
        description: row.equipment_description,
        imgUrl: row.equipment_img,
        isAvailable: row.equipment_available,
        requests: [request],
      };
    } else {
      storage[row.equipment_id].requests.push(request);
    }
  });

  for (const [key, value] of Object.entries(storage)) {
    result.push({ id: key, ...value });
  }

  return result;
}

async function findRented(renter_id) {
  return db("equipment as e")
    .join("requests as r", "e.equipment_id", "=", "r.equipment_id")
    .where("r.user_id", renter_id);
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

module.exports = {
  find,
  findById,
  findRented,
  findOwned,
  add,
  deleteById,
  updateById,
};
