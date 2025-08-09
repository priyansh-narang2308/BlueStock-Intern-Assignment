const bcrypt = require('bcrypt');
require('dotenv').config();

exports.seed = async function(knex) {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await knex('users').del();

  await knex('users').insert([
    {
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin'
    }
  ]);
};
