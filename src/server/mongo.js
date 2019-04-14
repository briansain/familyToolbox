const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoUri = 'mongodb://localhost:27017/FamilyToolbox-Recipes'
function connect() {
  mongoose.set('debug', true);
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true
  })
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.log(err));
}

module.exports = {
  connect,
  mongoose
};
