
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('location').insert([
        {name: 'Busan'},
        {name: 'Jeju'},
        {name: 'Jeonju'},
        {name: 'Gyeongju'},
        ]);
};