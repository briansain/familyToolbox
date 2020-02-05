const BudgetCategory = require('../models/budgetCategory.model');
const seedData = require('./budgetCategory.private.seed.json')

async function getCategories() {
  return BudgetCategory.find({}).exec();
}


function checkServerError(res, error) {
    if (error) {
        console.log(error);
        res.status(500).send(error);
        return error;
    }
}

function seedDatabase() {
    console.log('running transaction category seed');
    BudgetCategory.find({}, (err, res) => {
        if (err) {
            console.log('error running seed');
            console.error(err);
            return;
        }
        if (res.length === 0) {
            console.log('no records found, running seed');
            BudgetCategory.insertMany(seedData);
        }
    });
}

module.exports = {
  getCategories,
  seedDatabase
};
