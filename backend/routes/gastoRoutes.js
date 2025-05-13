const express = require('express');
const gastoController = require('../controllers/gastoController');

const router = express.Router();

router.post('/', gastoController.addGasto);
router.get('/', gastoController.getGastos);
router.put('/:id', gastoController.updateGasto);
router.delete('/:id', gastoController.deleteGasto);

module.exports = router;
