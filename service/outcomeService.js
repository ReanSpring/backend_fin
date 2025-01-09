const mongoose = require('mongoose');

const outcomeSchema = new mongoose.Schema({
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Outcome = mongoose.model('Outcome', outcomeSchema);

exports.createOutcome = async (outcomeData) => {
    const outcome = new Outcome(outcomeData);
    await outcome.save();
    return outcome;
}

exports.getOutcomes = async () => {
    const outcomes = await Outcome.find();
    return outcomes;
}

exports.getOutcomeById = async (id) => {
    const outcome = await Outcome.findById(id);
    return outcome;
}

exports.updateOutcome = async (id, outcomeData) => {
    const outcome = await Outcome.findByIdAndUpdate(id, outcomeData, { new: true });
    return outcome;
}

exports.deleteOutcome = async (id) => {
    const result = await Outcome.findByIdAndDelete(id);
    return result ? true : false;
}