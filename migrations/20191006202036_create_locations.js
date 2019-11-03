// The Migration
exports.up = function(knex) {
    return knex.schema
        .createTable('location', table => {
            table.increments('location_id').primary()
            table.string('name')
            // table.string('coords')	
    })
};

// Undo
exports.down = function(knex) {
  return knex.schema
      .dropTable('location')
};