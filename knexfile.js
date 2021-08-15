module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      database: 'cups',
    },
    migrations: {
      tableName: 'migrations',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
};
