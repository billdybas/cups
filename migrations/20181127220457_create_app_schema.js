exports.up = async function(knex) {
  await knex.schema.raw('CREATE SCHEMA app')
}

exports.down = async function(knex) {
  await knex.schema.raw('DROP SCHEMA app')
}
