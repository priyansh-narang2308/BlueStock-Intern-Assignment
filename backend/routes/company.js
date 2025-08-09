const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');

router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.post('/', auth, companyController.create);
router.put('/:id', auth, companyController.update);
router.delete('/:id', auth, companyController.remove);

module.exports = router;
