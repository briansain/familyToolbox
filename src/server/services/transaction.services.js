const Transactions = require('../models/transactions.model');
const IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
var es = require('event-stream');

function addTransactions(request, response) {
  var form = new IncomingForm();

  form.on('file', (field, file) => {
    console.log(file);
    // var data = fs.readFileSync(file.path);
    // console.log(data);
    var stream = fs.createReadStream(file.path)
    //es.split breaks the stream and assembles each chunk as a new line  
    //maybe could add es.map and convert each line into a tranaction object
    .pipe(es.split());

    stream.on('data', (a) => {
      console.log(a);
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