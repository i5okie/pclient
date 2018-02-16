module.exports = {
  port: process.env.S_PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'powerappdb',
    user: process.env.DB_USER || 'pserv',
    password: process.env.DB_PASS || 'pservpass',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './powerappdb.sqlite'
    }
  }
}
