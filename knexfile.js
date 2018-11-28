module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      database: 'cups'
    },
    migrations: {
      schemaName: 'knex',
      tableName: 'migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      schemaName: 'knex',
      tableName: 'migrations'
    }
  }
}
