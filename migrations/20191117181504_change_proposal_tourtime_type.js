exports.up = function(knex) {
  return knex.schema.alterTable("tour_proposal", table => {
    table.string("start_time").alter();
    table.string("end_time").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("tour_proposal", table => {
    table.date("start_time").alter();
    table.date("end_time").alter();
  });
};
