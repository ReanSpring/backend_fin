const dailyService = require('../service/dailyService');

exports.createDaily = async (req, res) => {
    try {
        const newDaily = await dailyService.createDaily(req.body);
        res.status(201).json({ message: 'Daily created', daily: newDaily });
    } catch (error) {
        res.status(500).json({ message: 'Error creating daily', error });
    }
}

exports.getDailies = async (req, res) => {
    try {
        const dailies = await dailyService.getDailies();
        res.json(dailies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dailies', error });
    }
}

exports.getDailyById = async (req, res) => {
    try {
        const daily = await dailyService.getDailyById(req.params.id);
        if (daily) {
            res.json(daily);
        } else {
            res.status(404).json({ message: 'Daily not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching daily', error });
    }
}

exports.updateDaily = async (req, res) => {
    try {
        const updatedDaily = await dailyService.updateDaily(req.params.id, req.body);
        if (updatedDaily) {
            res.json({ message: 'Daily updated', daily: updatedDaily });
        } else {
            res.status(404).json({ message: 'Daily not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating daily', error });
    }
}

exports.deleteDaily = async (req, res) => {
    try {
        const isDeleted = await dailyService.deleteDaily(req.params.id);
        if (isDeleted) {
            res.json({ message: 'Daily deleted' });
        } else {
            res.status(404).json({ message: 'Daily not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting daily', error });
    }
}

exports.calculateAmountYear = async (req, res) => {
    try {
        const result = await dailyService.calculateAmountYear();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating amounts', error });
    }
};

exports.calculateAmountMonth = async (req, res) => {
    try {
        const result = await dailyService.calculateAmountMonth();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating amounts', error });
    }
}

exports.calculateAmountWeek = async (req, res) => {
    try {
        const result = await dailyService.calculateAmountWeeks();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating amounts', error });
    }
}