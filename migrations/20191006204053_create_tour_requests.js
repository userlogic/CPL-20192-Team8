// The Migration
exports.up = function(knex) {
    return knex.schema
        .createTable('tour_request', table => {
            table.increments('tour_request_id').primary()
            table.date('tour_date')
            table.integer('pax')
            table.integer('budget')
            table.string('description')
            table.integer('requester_id').references('customer.customer_id')
            table.integer('tour_location_id').references('location.location_id')
    })
};

// Undo
exports.down = function(knex) {
  return knex.schema
      .dropTable('tour_request')
};
