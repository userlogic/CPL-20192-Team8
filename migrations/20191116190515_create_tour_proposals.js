exports.up = function(knex) {
  return knex.schema.createTable("tour_proposal", table => {
    table.increments("tour_proposal_id").primary();
    table.boolean("final_match").defaultTo(false);
    table.string("theme");
    table.string("description");
    table.integer("price");
    table.date("start_time");
    table.date("end_time");
    // table.integer("prop_customer_id").reference("customer.customer_id");
    table
      .integer("prop_tour_request_id")
      .references("tour_request.tour_request_id");
    table.integer("prop_guide_id").references("guide.guide_id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tour_proposal");
};
