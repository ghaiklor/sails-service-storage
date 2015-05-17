var AmazonStorage = require('./AmazonStorage');
var GoogleCloudStorage = require('./GoogleCloudStorage');
var LocalStorage = require('./LocalStorage');

module.exports = {
  create: function (type, config) {
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
  },

  Amazon: AmazonStorage,
  GoogleCloud: GoogleCloudStorage,
  Local: LocalStorage
};
