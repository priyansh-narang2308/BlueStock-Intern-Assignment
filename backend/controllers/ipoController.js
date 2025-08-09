const IPO = require('../models/ipo');

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const ipos = await IPO.getAll({ page, limit });
    res.json(ipos);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { q } = req.query;
    const ipos = await IPO.search(q);
    res.json(ipos);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const ipo = await IPO.getById(req.params.id);
    if (!ipo) return res.status(404).json({ message: 'IPO not found' });
    res.json(ipo);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const ipo = await IPO.create(req.body);
    res.status(201).json(ipo);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const ipo = await IPO.update(req.params.id, req.body);
    res.json(ipo);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await IPO.remove(req.params.id);
    res.json({ message: 'IPO deleted' });
  } catch (err) {
    next(err);
  }
};
