
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {username: "Sonic", password: '1234', role: "renter"},
        {username: "Mario", password: '1234', role: "owner"},
        {username: "Luigi", password: '1234', role: "renter"}, 
      ]);
    });
};
