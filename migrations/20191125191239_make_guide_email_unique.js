exports.up = function(knex) {
  return knex.schema.alterTable("guide", table => {
    table.unique("email");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("guide", table => {
    table.dropUnique("email");
  });
};
