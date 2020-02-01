const Transaction = require('../models/transactions.model');
const IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
var es = require('event-stream');

async function addTransactions(request, response) {
  var form = new IncomingForm();

  form.on('file', (field, file) => {
    console.log(file);

    var stream = fs.createReadStream(file.path)
      .pipe(es.split());

    stream.on('data', (row) => {
      console.log(row);
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

        Transaction.exists({ originalDescription: transaction.originalDescription }).then(result => {
          if (result) {
            Transaction.findOneAndUpdate({ originalDescription: transaction.originalDescription }, transaction, (err) => {
              if (err) throw err;
            });
          } else {
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

module.exports = {
  addTransactions
}

//https://malcoded.com/posts/angular-file-upload-component-with-express/