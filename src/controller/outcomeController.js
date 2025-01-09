const outcomeService = require('../service/outcomeService');

exports.createOutcome = async (req, res) => {
    try{
        const newOutcome = await outcomeService.createOutcome(req.body);
        res.status(201).json({ message: 'Outcome created', outcome: newOutcome });
    }catch(error){
        res.status(500).json({ message: 'Error creating outcome', error });
    }
}

exports.getOutcomes = async (req, res) => {
    try{
        const outcomes = await outcomeService.getOutcomes();
        res.json(outcomes);
    }catch(error){
        res.status(500).json({ message: 'Error fetching outcomes', error });
    }
}

exports.getOutcomeById = async (req, res) => {
    try{
        const outcome = await outcomeService.getOutcomeById(req.params.id);
        if(outcome){
            res.json(outcome);
        }else{
            res.status(404).json({ message: 'Outcome not found' });
        }
    }catch(error){
        res.status(500).json({ message: 'Error fetching outcome', error });
    }
}


exports.updateOutcome = async (req, res) => {
    try{
        const updatedOutcome = await outcomeService.updateOutcome(req.params.id, req.body);
        if(updatedOutcome){
            res.json({ message: 'Outcome updated', outcome: updatedOutcome });
        }else{
            res.status(404).json({ message: 'Outcome not found' });
        }
    }catch(error){
        res.status(500).json({ message: 'Error updating outcome', error });
    }
}


exports.deleteOutcome = async (req, res) => {
    try{
        const isDeleted = await outcomeService.deleteOutcome(req.params.id);
        if(isDeleted){
            res.json({ message: 'Outcome deleted' });
        }else{
            res.status(404).json({ message: 'Outcome not found' });
        }
    }catch(error){
        res.status(500).json({ message: 'Error deleting outcome', error });
    }
}