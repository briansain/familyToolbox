const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetAmountSchema = new Schema({
  amount: Number,
  isPaid: Boolean,
  isCash: Boolean,
  isAutoPay: Boolean
});
const budgetItemSchema = new Schema({
  itemHeader: String,
  notes: String,
  budgetAmounts: [budgetAmountSchema]
});
const budgetSectionSchema = new Schema({
  sectionHeader: String,
  budgetItems: [budgetItemSchema]
});

const paycheckSchema = new Schema({
  source: String,
  amount: Number,
  startDate: Date,
  endDate: Date
});

const budgetSchema = new Schema({
  title: String,
  paychecks: [paycheckSchema],
  month: Date,
  sections: [budgetSectionSchema]
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;