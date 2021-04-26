exports.seed = function (knex) {
  return knex("items_rented")
    .del()
    .then(function () {
      return knex("items_rented").insert([
        { user_id: 1, equipment_id: 1 },
        { user_id: 3, equipment_id: 1 },
      ]);
    });
};
