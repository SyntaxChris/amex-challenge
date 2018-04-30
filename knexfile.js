module.exports = {
  development: {
    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'chris',
      password: 'volcom21',
      database: 'amex_challenge',
      charset: 'utf8'
    }
  }
}
