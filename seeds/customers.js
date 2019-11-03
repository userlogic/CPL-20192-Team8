
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customer').del()
    .then(function () {
      // Inserts seed entries
      return knex('customer').insert([
        {first_name: 'bbb', last_name: 'ccc', email: 'a@a.com', password: 'abcdefgh'},
        {first_name: 'ddd', last_name: 'eee', email: 'f@f.com', password: '11111111'},
        {first_name: 'eee', last_name: 'fff', email: 'f@f.com', password: '22222211'}
      ]);
    });
};
