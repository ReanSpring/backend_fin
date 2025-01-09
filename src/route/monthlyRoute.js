const express = require('express');

const monthlyController = require('../controller/monthlyController');

const router = express.Router();

router.post('/', monthlyController.createMonthly);
router.get('/', monthlyController.getMonthlies);
router.get('/:id', monthlyController.getMonthlyById);
router.put('/:id', monthlyController.updateMonthly);
router.delete('/:id', monthlyController.deleteMonthly);

module.exports = router;