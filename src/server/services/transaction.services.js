const Transaction = require('../models/transactions.model');
const IncomingForm = require('formidable').IncomingForm;
const budgetCategoryService = require('./budgetCategory.services');
var fs = require('fs');
var es = require('event-stream');

//get rid of request/response as parameters
async function addTransactions(request, response) {
  var form = new IncomingForm();
  var budgetCategories = await budgetCategoryService.getCategories();

  form.on('file', (field, file) => {
    var stream = fs.createReadStream(file.path)
      .pipe(es.split());

    stream.on('data', (row) => {
      if (!row.includes('Account') && row.trim()) {
        const valuesArray = row.split(',');

        var transaction = {
          accountNumber: valuesArray[0].replace(/"/g, '').trim(),
          postedDate: valuesArray[1],
          originalDescription: valuesArray[3].replace(/"/g, '').trim(),
          debit: valuesArray[4] ? parseFloat(valuesArray[4]).toFixed(2) : valuesArray[4],
          credit: valuesArray[5] ? parseFloat(valuesArray[5]).toFixed(2) : valuesArray[5],
          status: valuesArray[6],
          balance: parseFloat(valuesArray[7])
        };

        //should refactor so that status bar on browser reflects status of upload?
        Transaction.exists({ originalDescription: transaction.originalDescription }).then(result => {
          if (result) {
            Transaction.findOneAndUpdate({ originalDescription: transaction.originalDescription }, transaction, (err) => {
              if (err) throw err;
            });
          } else {
            var foundMatch = budgetCategories.find(value => {
              return value.matchValues.find(valueToMatch => {
                if(transaction.originalDescription.toLowerCase().indexOf(valueToMatch.toLowerCase()) >= 0) {
                  return true;
                }
              });
            }); 
    
            if (foundMatch) {
              transaction.description = foundMatch.description ? foundMatch.description : transaction.originalDescription;
              transaction.budgetCategory = foundMatch.category;
            } else {
              transaction.description = transaction.originalDescription;
            }
  
            Transaction.create(transaction);
          }
        });

        //may not be necessary if the description doesn't change.
        //the postedDate doesn't include time, so it's not as fine as it should be
        // transaction.calculatedValue = transaction.accountNumber.toString() + '-' + 
        //   transaction.postedDate.toString() + '-' + 
        //   transaction.debit.toString() + '-' + 
        //   transaction.credit.toString(); //accountNumber + postedDate + credit + debit = should be unique enough
      }

    });
  });

  form.on('end', () => {
    response.json();
  });

  form.parse(request);
}

//refactor to be async and get rid of request/response as parameters
async function getTransactions(dateRange) {
  var beginningOfMonth = new Date(dateRange.getFullYear(), dateRange.getMonth(), 1);
  var endOfMonth = new Date(dateRange.getFullYear(), dateRange.getMonth() + 1, 0);
  var result = await Transaction.find({postedDate: {$gte: beginningOfMonth, $lte: endOfMonth}}, null, {sort: {postedDate: 1}}).exec();
  console.log(result);
  return result;
}

module.exports = {
  addTransactions,
  getTransactions
}

//https://malcoded.com/posts/angular-file-upload-component-with-express/