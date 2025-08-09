const knex = require('knex');
const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
};
module.exports = knex(config);
