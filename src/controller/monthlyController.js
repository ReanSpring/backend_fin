const monthlyService = require('../service/monthlyService');

exports.createMonthly = async (req, res) => {
    try {
        const newMonthly = await monthlyService.createMonthly(req.body);
        res.status(201).json({ message: 'Monthly created', monthly: newMonthly });
    } catch (error) {
        res.status(500).json({ message: 'Error creating monthly', error });
    }
}

exports.getMonthlies = async (req, res) => {
    try {
        const monthlies = await monthlyService.getMonthlies();
        res.json(monthlies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching monthlies', error });
    }
}

exports.getMonthlyById = async (req, res) => {
    try {
        const monthly = await monthlyService.getMonthlyById(req.params.id);
        if (monthly) {
            res.json(monthly);
        } else {
            res.status(404).json({ message: 'Monthly not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching monthly', error });
    }
}

exports.updateMonthly = async (req, res) => {
    try {
        const updatedMonthly = await monthlyService.updateMonthly(req.params.id, req.body);
        if (updatedMonthly) {
            res.json({ message: 'Monthly updated', monthly: updatedMonthly });
        } else {
            res.status(404).json({ message: 'Monthly not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating monthly', error });
    }
}

exports.deleteMonthly = async (req, res) => {
    try {
        const isDeleted = await monthlyService.deleteMonthly(req.params.id);
        if (isDeleted) {
            res.json({ message: 'Monthly deleted' });
        } else {
            res.status(404).json({ message: 'Monthly not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting monthly', error });
    }
}