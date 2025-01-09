const express = require('express');
const dailyController = require('../controller/dailyController');

const router = express.Router();

router.post('/', dailyController.createDaily);
router.get('/', dailyController.getDailies);
// amount calculation
router.get('/calculate_years', dailyController.calculateAmountYear);
router.get('/calculate_month', dailyController.calculateAmountMonth);
router.get('/calculate_week', dailyController.calculateAmountWeek);
router.get('/:id', dailyController.getDailyById);
router.put('/:id', dailyController.updateDaily);
router.delete('/:id', dailyController.deleteDaily);

module.exports = router;