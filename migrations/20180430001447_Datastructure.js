exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable( 'people', function( peopleTable ) {
      // Primary Key
      peopleTable.increments();
      // Data
      peopleTable.string('name', 50).notNullable();
      peopleTable.integer('age', 50).notNullable();
      peopleTable.date('date_of_birth', 50).notNullable();
      peopleTable.string('email', 250).notNullable().unique();
      peopleTable.timestamp('created_at').notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('people');
};
