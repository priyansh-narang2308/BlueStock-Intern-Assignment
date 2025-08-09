const db = require('../models/knex');

exports.stats = async (req, res, next) => {
  try {
    const ipoCount = await db('ipos').count('id');
    const companyCount = await db('companies').count('id');
    res.json({ ipos: parseInt(ipoCount[0].count), companies: parseInt(companyCount[0].count) });
  } catch (err) {
    next(err);
  }
};

exports.logs = async (req, res, next) => {
  try {
    res.json([
      { email: 'admin@example.com', time: new Date().toISOString(), action: 'login' },
    ]);
  } catch (err) {
    next(err);
  }
};
