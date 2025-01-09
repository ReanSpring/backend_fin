const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id; // Add id field
            delete ret._id;  // Remove _id field
            delete ret.__v;  // Remove __v field
        },
    },
});

const Income = mongoose.model('Income', incomeSchema);

exports.createIncome = async (incomeData) => {
    // const income = new Income(incomeData);
    // await income.save();
    // return income;
    const lastIncome = await Income.findOne().sort({ id: -1 }); // Get the highest id
    const newId = lastIncome ? lastIncome.id + 1 : 1;

    const income = new Income({
        id: newId,
        ...incomeData,
    });
    await income.save();
    return income;
}

exports.getIncomes = async () => {
    const incomes = await Income.find();
    return incomes;
}

exports.getIncomeById = async (id) => {
    const income = await Income.findById(id);
    return income;
}

exports.updateIncome = async (id, incomeData) => {
    const income = await Income.findByIdAndUpdate(id, incomeData, { new: true });
    return income;
}

exports.deleteIncome = async (id) => {
    const result = await Income.findByIdAndDelete(id);
    return result ? true : false;
}