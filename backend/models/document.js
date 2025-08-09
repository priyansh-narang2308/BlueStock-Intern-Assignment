const db = require('./knex');

const Document = {
  async create({ ipo_id, filename, originalname }) {
    return db('documents').insert({ ipo_id, filename, originalname }).returning('*');
  },
  async getByIPOId(ipo_id) {
    return db('documents').where({ ipo_id }).first();
  },
  async removeByIPOId(ipo_id) {
    return db('documents').where({ ipo_id }).del();
  },
};

module.exports = Document;
