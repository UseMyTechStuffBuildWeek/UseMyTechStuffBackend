
exports.seed = function(knex) {
  return knex('items_rented').del()
    .then(function () {
      return knex('items_rented').insert([
        {user_id: 1},
        {user_id: 2},
        {user_id: 3}
      ]);
    });
};
