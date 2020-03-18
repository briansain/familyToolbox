const mongoose = require('mongoose');
const mongoSettings = require('./settings.mongo.json');

mongoose.Promise = global.Promise;

const mongoUri = mongoSettings.connectionString;
function connect() {
  mongoose.set('debug', true);
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.log(err));
}

module.exports = {
  connect,
  mongoose
};
