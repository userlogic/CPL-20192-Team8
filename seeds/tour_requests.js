
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tour_request').del()
    .then(function () {
      // Inserts seed entries
      return knex('tour_request').insert([
        {tour_date: '2018-01-01', pax: 3, budget: 1000, description: 'A fun tour!', requester_id: 2, tour_location_id: 1},
        {tour_date: '2015-05-05', pax: 4, budget: 2000, description: 'A super-duper fun tour!', requester_id: 1, tour_location_id: 2},
      ]);
    });
};

