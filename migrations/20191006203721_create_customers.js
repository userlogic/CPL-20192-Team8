// The Migration
exports.up = function(knex) {
  return knex.schema.createTable("customer", table => {
    table.increments("customer_id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("email");
    table.string("password");
  });
};

// Undo
exports.down = function(knex) {
  return knex.schema.dropTable("customer");
};
