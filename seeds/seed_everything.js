

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tour_request').del()
  .then(() => {return knex('customer').del(); })
  .then(() => {return knex('location').del(); })
  .then(() => {
    // Inserts seed entries
    return knex('location').insert([
    {name: 'Seoul'},
    {name: 'Daegu'},
    {name: 'Busan'},
    {name: 'Jeju'},
    {name: 'Jeonju'},
    {name: 'Gyeongju'},
    ]);
  })
  .then(() => {
    return knex('customer').insert([
      {first_name: 'Taylor', last_name: 'Swift', email: 'a@a.com', password: 'abcdef'},
      {first_name: 'Bob', last_name: 'Builder', email: 'f@f.com', password: 'abcdef'},
      {first_name: 'Lionel', last_name: 'Nessi', email: 'f@f.com', password: 'abcdef'}
    ]);
  })
  .then(() => { let customerIds;
                return knex('customer').pluck('customer_id').then((ids) => {
                                                                    customerIds = ids;
                                                                    return knex('location').pluck('location_id');})
                                                            .then((locationIds) => { return {locations: locationIds,
                                                                                             customers: customerIds}});
  })
  .then((idObject) => {
      console.log(idObject);
      return knex('tour_request').insert([
        {tour_date: '2018-01-01', pax: 3, budget: 1000, description: 'A fun tour!', 
        requester_id: idObject['customers'][0], tour_location_id: idObject['locations'][0]},
        {tour_date: '2015-05-05', pax: 4, budget: 2000, description: 'A super-duper fun tour!', 
        requester_id: idObject['customers'][1], tour_location_id: idObject['locations'][1]},
      ])})
};
