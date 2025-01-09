const express = require('express');
const incomeController = require('../controller/incomeController');

const router = express.Router();

router.post('/', incomeController.createIncome);
router.get('/', incomeController.getIncomes);
router.get('/:id', incomeController.getIncomeById);
router.put('/:id', incomeController.updateIncome);
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;