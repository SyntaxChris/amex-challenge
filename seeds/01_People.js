
exports.seed = function(knex, Promise) {
  // // Deletes ALL existing entries
  return knex('people').del()
    .then(function () {
      // Inserts seed entries
      return knex('people').insert([{ 
        name: 'Shreyansh Pandey',
        age: 33,
        date_of_birth: '1984-06-15',
        email : 'me@isomr.co'
      }]);
    });
};
