const express = require('express');

const outcomeController = require('../controller/outcomeController');

const router = express.Router();

router.post('/', outcomeController.createOutcome);
router.get('/', outcomeController.getOutcomes);
router.get('/:id', outcomeController.getOutcomeById);
router.put('/:id', outcomeController.updateOutcome);
router.delete('/:id', outcomeController.deleteOutcome);

module.exports = router;
