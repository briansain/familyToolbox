const Transactions = require('../models/transactions.model');
const IncomingForm = require('formidable').IncomingForm;

function addTransactions(request, response) {
  var form = new IncomingForm();

  form.on('file', (field, file) => {

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