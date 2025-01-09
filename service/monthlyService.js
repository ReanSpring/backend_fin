const mongoose = require('mongoose');

const monthlySchema = new mongoose.Schema({
    month: { type: String, required: true },
    amount: { type: Number, required: true },
});

const Monthly = mongoose.model('Monthly', monthlySchema);

exports.createMonthly = async (monthlyData) => {
    const monthly = new Monthly(monthlyData);
    await monthly.save();
    return monthly;
}

exports.getMonthlies = async () => {
    const monthlies = await Monthly.find();
    return monthlies;
}

exports.getMonthlyById = async (id) => {
    const monthly = await Monthly.findById(id);
    return monthly;
}

exports.updateMonthly = async (id, monthlyData) => {
    const monthly = await Monthly.findByIdAndUpdate(id, monthlyData, { new: true });
    return monthly;
}

exports.deleteMonthly = async (id) => {
    const result = await Monthly.findByIdAndDelete(id);
    return result ? true : false;
}
