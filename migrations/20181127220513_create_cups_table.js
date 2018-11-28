exports.up = async function(knex) {
  await knex.schema.withSchema('app').createTable('cups', function(t) {
    t.increments()
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function(knex) {
  await knex.schema.withSchema('app').dropTable('cups')
}
