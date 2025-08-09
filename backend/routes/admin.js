const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/stats' , adminController.stats);
router.get('/logs', adminController.logs);

module.exports = router;
