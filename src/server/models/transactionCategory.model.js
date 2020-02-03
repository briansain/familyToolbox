const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionCategorySchema = new Schema({
    matchValues: [String],
    description: String,
    category: String
});
const TransactionCategory = mongoose.model('TransactionCategory', transactionCategorySchema);

module.exports = TransactionCategory;