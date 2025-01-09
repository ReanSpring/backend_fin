const mongoose = require('mongoose');

const yearlySchema = new mongoose.Schema({
    year: { type: String, required: true },
    amount: { type: Number, required: true },
});

const Yearly = mongoose.model('Yearly', yearlySchema);

exports.createYearly = async (yearlyData) => {
    const yearly = new Yearly(yearlyData);
    await yearly.save();
    return yearly;
}

exports.getYearlies = async () => {
    const yearlies = await Yearly.find();
    return yearlies;
}

exports.getYearlyById = async (id) => {
    const yearly = await Yearly.findById(id);
    return yearly;
}

exports.updateYearly = async (id, yearlyData) => {
    const yearly = await Year
    ly.findByIdAndUpdate(id, yearlyData, { new: true });
    return yearly;
}

exports.deleteYearly = async (id) => {
    const result = await Yearly.findByIdAndDelete(id);
    return result ? true : false;
}