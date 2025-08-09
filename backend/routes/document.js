const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/:id/upload', auth, upload.single('pdf'), documentController.upload);
router.get('/:id/download', documentController.download);
router.delete('/:id/delete-doc', auth, documentController.remove);

module.exports = router;
