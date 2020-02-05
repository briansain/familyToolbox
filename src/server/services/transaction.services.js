const Transaction = require('../models/transactions.model');
const IncomingForm = require('formidable').IncomingForm;
const transactionCategoryService = require('../services/transactionCategory.services');
var fs = require('fs');
var es = require('event-stream');

async function addTransactions(request, response) {
  var form = new IncomingForm();
  var transactionCategories = await transactionCategoryService.getCategories();

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
          debit: valuesArray[4],
          credit: valuesArray[5],
          status: valuesArray[6],
          balance: valuesArray[7]
        };

        //should refactor so that status bar on browser reflects status of upload?
        Transaction.exists({ originalDescription: transaction.originalDescription }).then(result => {
          if (result) {
            Transaction.findOneAndUpdate({ originalDescription: transaction.originalDescription }, transaction, (err) => {
              if (err) throw err;
            });
          } else {
            var foundMatch = transactionCategories.find(value => {
              return value.matchValues.find(valueToMatch => {
                if(transaction.originalDescription.toLowerCase().indexOf(valueToMatch.toLowerCase()) >= 0) {
                  return true;
                }
              });
            }); 
    
            if (foundMatch) {
              transaction.description = foundMatch.description;
              transaction.category = foundMatch.category;
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

function catelogTransaction(categlogs, transaction) {

}


module.exports = {
  addTransactions
}

//https://malcoded.com/posts/angular-file-upload-component-with-express/