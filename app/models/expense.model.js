const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    title: String,
    description: String,
    spentBy: String,
    amount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);
