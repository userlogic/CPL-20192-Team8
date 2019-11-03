
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('location')
    .then(function () {
      // Inserts seed entries
      return knex('location').insert([
        {name: 'Seoul'},
        {name: 'Daegu'},
        {name: 'Busan'},
        {name: 'Jeju'},
        {name: 'Jeonju'},
        {name: 'Gyeongju'},
        ]);
    });
};