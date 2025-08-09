const db = require('./knex');
const bcrypt = require('bcrypt');

const User = {
  async findByEmail(email) {
    return db('users').where({ email }).first();
  },
  async create({ email, password }) {
    const hash = await bcrypt.hash(password, 10);
    return db('users').insert({ email, password: hash });
  },
  async verifyPassword(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  },
};

module.exports = User;
