const incomeService = require('../service/incomeService');

exports.createIncome = async (req, res) => {
    try {
        const newIncome = await incomeService.createIncome(req.body);
        res.status(201).json({ message: 'Income created', income: newIncome });
    } catch (error) {
        res.status(500).json({ message: 'Error creating income', error });
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await incomeService.getIncomes();
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incomes', error });
    }
}

exports.getIncomeById = async (req, res) => {
    try {
        const income = await incomeService.getIncomeById(req.params.id);
        if (income) {
            res.json(income);
        } else {
            res.status(404).json({ message: 'Income not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income', error });
    }
}

exports.updateIncome = async (req, res) => {
    try {
        const updatedIncome = await incomeService.updateIncome(req.params.id, req.body);
        if (updatedIncome) {
            res.json({ message: 'Income updated', income: updatedIncome });
        } else {
            res.status(404).json({ message: 'Income not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating income', error });
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const isDeleted = await incomeService.deleteIncome(req.params.id);
        if (isDeleted) {
            res.json({ message: 'Income deleted' });
        } else {
            res.status(404).json({ message: 'Income not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting income', error });
    }
}