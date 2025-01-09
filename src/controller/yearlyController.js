const yearlyService = require('../service/yearlyService');

exports.createYearly = async (req, res) => {
    try {
        const newYearly = await yearlyService.createYearly(req.body);
        res.status(201).json({ message: 'Yearly created', yearly: newYearly });
    } catch (error) {
        res.status(500).json({ message: 'Error creating yearly', error });
    }
}

exports.getYearlies = async (req, res) => {
    try {
        const yearlies = await yearlyService.getYearlies();
        res.json(yearlies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching yearlies', error });
    }
}

exports.getYearlyById = async (req, res) => {
    try {
        const yearly = await yearlyService.getYearlyById(req.params.id);
        if (yearly) {
            res.json(yearly);
        } else {
            res.status(404).json({ message: 'Yearly not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching yearly', error });
    }
}

exports.updateYearly = async (req, res) => {
    try {
        const updatedYearly = await yearlyService.updateYearly(req.params.id, req.body);
        if (updatedYearly) {
            res.json({ message: 'Yearly updated', yearly: updatedYearly });
        } else {
            res.status(404).json({ message: 'Yearly not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating yearly', error });
    }
}

exports.deleteYearly = async (req, res) => {
    try {
        const isDeleted = await yearlyService.deleteYearly(req.params.id);
        if (isDeleted) {
            res.json({ message: 'Yearly deleted' });
        } else {
            res.status(404).json({ message: 'Yearly not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting yearly', error });
    }
}
