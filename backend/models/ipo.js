const db = require('./knex');

const IPO = {
  async getAll({ page = 1, limit = 10 }) {
    return db('ipos').limit(limit).offset((page - 1) * limit);
  },
  async search(q) {
    return db('ipos').where('name', 'ilike', `%${q}%`);
  },
  async getById(id) {
    return db('ipos').where({ id }).first();
  },
  async create(data) {
    return db('ipos').insert(data).returning('*');
  },
  async update(id, data) {
    return db('ipos').where({ id }).update(data).returning('*');
  },
  async remove(id) {
    return db('ipos').where({ id }).del();
  },
};

module.exports = IPO;
