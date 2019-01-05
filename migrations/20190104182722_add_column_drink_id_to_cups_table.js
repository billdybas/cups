exports.up = async function(knex) {
  await knex.schema.withSchema('app').table('cups', function(t) {
    // A drink should only be deleted if it hasn't been tracked before
    t.integer('drink_id').references('id').inTable('app.drinks').onDelete('RESTRICT')
  })
}

exports.down = async function(knex) {
  await knex.schema.withSchema('app').table('cups', function(t) {
    t.dropColumn('drink_id')
  })
}
