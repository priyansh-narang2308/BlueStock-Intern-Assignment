const bcrypt = require('bcrypt');
require('dotenv').config();

exports.seed = async function(knex) {
  const email = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASSWORD;

  const user = await knex('users').where({ email }).first();
  if (user) {
    console.log('✅ Admin user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await knex('users').insert({
    email,
    password: hashedPassword,
    role: 'admin',
    created_at: new Date()
  });

  console.log(`✅ Admin user ${email} created successfully`);
};
