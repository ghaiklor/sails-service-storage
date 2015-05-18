var AmazonStorage = require('./AmazonStorage');
var GoogleCloudStorage = require('./GoogleCloudStorage');

module.exports = {
  create: function (type, config) {
    switch (type.toLowerCase()) {
      case 'aws':
      case 'amazon':
        return new AmazonStorage(config);
      case 'gcloud':
      case 'google cloud':
        return new GoogleCloudStorage(config);
      default:
        throw new Error('Unrecognized storage type -> ' + type);
    }
  },

  Amazon: AmazonStorage,
  GoogleCloud: GoogleCloudStorage
};
