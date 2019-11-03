// Update with your config settings.

// File has to be named exactly ".env", i.e. only an extension, no name
// Need to do ALTER USER postgres PASSWORD 'capstoneteam8';  first in psql.

// When running the migrations, note that they are run in order of creation (to prevent foreign key conflicts)

require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL
  // connection: {
  //   host: "localhost",
  //   port: 5432,
  //   user: "postgres",
  //   password: "capstoneteam8",
  //   database: "hn"
  // }
};