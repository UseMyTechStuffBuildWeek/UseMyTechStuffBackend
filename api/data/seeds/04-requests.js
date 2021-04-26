exports.seed = function (knex) {
  return knex("requests")
    .del()
    .then(function () {
      return knex("requests").insert([
        { request_id: 1, equipment_id: 1, user_id: 1, accepted: false },
        { request_id: 3, equipment_id: 3, user_id: 3, accepted: true },
      ]);
    });
};
