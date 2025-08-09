const db = require('./knex');

const Company = {
  async getAll() {
    return db('companies').select('*');
  },
  async getById(id) {
    return db('companies').where({ id }).first();
  },
  async create(data) {
    return db('companies').insert(data).returning('*');
  },
  async update(id, data) {
    return db('companies').where({ id }).update(data).returning('*');
  },
  async remove(id) {
    return db('companies').where({ id }).del();
  },
};

module.exports = Company;
