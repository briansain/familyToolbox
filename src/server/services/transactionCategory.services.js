const TransactionCategory = require('../models/transactionCategory.model');
const seedData = require('./transactionCategory.private.seed.json')

async function getCategories() {
  return TransactionCategory.find({}).exec();
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
    TransactionCategory.find({}, (err, res) => {
        if (err) {
            console.log('error running seed');
            console.error(err);
            return;
        }
        if (res.length === 0) {
            console.log('no records found, running seed');
            TransactionCategory.insertMany(seedData);
        }
    });
}

module.exports = {
  getCategories,
  seedDatabase
};
