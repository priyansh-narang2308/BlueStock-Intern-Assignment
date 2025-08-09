const express = require('express');
const router = express.Router();
const ipoController = require('../controllers/ipoController');
const auth = require('../middleware/auth');

router.get('/', ipoController.getAll);
router.get('/search', ipoController.search);
router.get('/:id', ipoController.getById);
router.post('/', auth, ipoController.create);
router.put('/:id', auth, ipoController.update);
router.delete('/:id', auth, ipoController.remove);

module.exports = router;
