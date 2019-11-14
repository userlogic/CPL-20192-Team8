
exports.up = function(knex) {
  return knex.schema
    .createTable('guide', table => {
        table.increments('guide_id').primary()
        table.string('first_name')
        table.string('last_name')
        table.string('email')
        table.string('password')
        table.string('picture_path')
        table.integer('age')
        table.string('sex')
        table.integer('guide_location_id').references('location.location_id')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('guide')
};
