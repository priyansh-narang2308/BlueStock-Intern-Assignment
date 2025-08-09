const Company = require('../models/company');

exports.getAll = async (req, res, next) => {
  try {
    const companies = await Company.getAll();
    res.json(companies);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const company = await Company.getById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const company = await Company.update(req.params.id, req.body);
    res.json(company);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Company.remove(req.params.id);
    res.json({ message: 'Company deleted' });
  } catch (err) {
    next(err);
  }
};
