var AmazonStorage = require('./lib/AmazonStorage');
var GoogleCloudStorage = require('./lib/GoogleCloudStorage');
var LocalStorage = require('./lib/LocalStorage');

module.exports = function createStorage(type, config) {
  switch (type.toLowerCase()) {
    case 'amazon':
      return new AmazonStorage(config);
    case 'google cloud':
      return new GoogleCloudStorage(config);
    case 'local':
      return new LocalStorage(config);
    default:
      throw new Error('Unrecognized storage type -> ' + type);
  }
};
