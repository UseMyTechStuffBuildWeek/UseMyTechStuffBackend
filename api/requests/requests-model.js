const db = require("../data/db-config");

function findById(request_id) {
  return db("requests").where("request_id", request_id).first();
}

function findByOwnerId(owner_id) {
  return db("requests as r")
    .join("equipment as e", "e.equipment_id", "=", "r.equipment_id")
    .select("r.user_id as renter_id", "e.user_id as owner_id", "e.equipment_id")
    .where("e.user_id", owner_id);
}

async function add(request) {
  const [request_id] = await db("requests").insert(request, "request_id");
  return findById(request_id);
}

async function deleteById(request_id) {
  const request = await findById(request_id);
  await db("requests").where("request_id", request_id).del();
  return request;
}

module.exports = { findById, findByOwnerId, add, deleteById };
