exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable().unique();
      users.string("password", 200).notNullable();
      users.string("role", 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable("equipment", (tbl) => {
      tbl.increments("equipment_id");
      tbl.string("equipment_name", 200).notNullable();
      tbl.string("equipment_description", 320).notNullable();
      tbl.boolean("equipment_available").notNullable();
      tbl.string("equipment_img").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("items_rented", (tbl) => {
      tbl.increments("items_rented_id");
      tbl
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("requests", (tbl) => {
      tbl.increments("request_id");
      tbl
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("equipment_id")
        .unsigned()
        .references("equipment_id")
        .inTable("equipment")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("requests");
  await knex.schema.dropTableIfExists("items_rented");
  await knex.schema.dropTableIfExists("equipment");
  await knex.schema.dropTableIfExists("users");
};
