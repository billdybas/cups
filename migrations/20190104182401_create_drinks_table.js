exports.up = async function(knex) {
  await knex.schema.withSchema('app').createTable('drinks', function(t) {
    t.increments()
    t.text('name').unique()
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function(knex) {
  await knex.schema.withSchema('app').dropTable('drinks')
}
