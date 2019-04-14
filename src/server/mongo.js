const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoUri = 'mongodb://localhost:27017/FamilyToolbox-Recipes'
// const mongoUri = 'mongodb://family-toolbox-recipes.documents.azure.com:10255/admin?ssl=true&replicaSet=globaldb&sslverifycertificate=false'
function connect() {
  mongoose.set('debug', true);
  return mongoose.connect(mongoUri, {
    // auth: {
    //   user: 'family-toolbox-recipes',
    //   password: '***REMOVED***'
    // },
    useNewUrlParser: true
  })
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.log(err));
}

module.exports = {
  connect,
  mongoose
};
