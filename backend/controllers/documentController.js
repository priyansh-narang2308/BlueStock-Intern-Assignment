const Document = require('../models/document');
const path = require('path');
const fs = require('fs');

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { id } = req.params;
    const doc = await Document.create({ ipo_id: id, filename: req.file.filename, originalname: req.file.originalname });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.download = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await Document.getByIPOId(id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    const filePath = path.join(__dirname, '../uploads', doc.filename);
    res.download(filePath, doc.originalname);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await Document.getByIPOId(id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    const filePath = path.join(__dirname, '../uploads', doc.filename);
    fs.unlinkSync(filePath);
    await Document.removeByIPOId(id);
    res.json({ message: 'Document deleted' });
  } catch (err) {
    next(err);
  }
};
