const express = require('express');

const yearlyController = require('../controller/yearlyController');

const router = express.Router();

router.post('/', yearlyController.createYearly);
router.get('/', yearlyController.getYearlies);
router.get('/:id', yearlyController.getYearlyById);
router.put('/:id', yearlyController.updateYearly);
router.delete('/:id', yearlyController.deleteYearly);

module.exports = router;