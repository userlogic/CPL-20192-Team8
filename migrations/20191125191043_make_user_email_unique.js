exports.up = function(knex) {
  return knex.schema.alterTable("customer", table => {
    table.unique("email");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("customer", table => {
    table.dropUnique("email");
  });
};
