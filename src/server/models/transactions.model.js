const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    calculatedValue: String,
    accountNumber: String,
    postedDate: Date,
    originalDescription: String,
    debit: Number,
    credit: Number,
    status: String,
    balance: Number,
    budgetCategory: String,
    description: String,
});
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;