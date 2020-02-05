const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const budgetCategorySchema = new Schema({
    matchValues: [String],
    description: String,
    category: String
});
const BudgetCategory = mongoose.model('BudgetCategory', budgetCategorySchema);

module.exports = BudgetCategory;