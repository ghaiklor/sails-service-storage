var extend = require('node.extend');
var AmazonStorage = require('./AmazonStorage');
var GoogleCloudStorage = require('./GoogleCloudStorage');
var LocalStorage = require('./LocalStorage');

/**
 * Create instance of StorageFactory
 * @param {Object} config
 * @constructor
 */
function StorageFactory(config) {
  this._config = config;
}

StorageFactory.prototype = {
  /**
   * Create one of storage services
   * @param {String} type Type of Storage Service
   * @param {Object} config Configuration object for Storage Service
   * @returns {*}
   */
  create: function (type, config) {
    config = extend({}, this._config, config);

    switch (type.toLowerCase()) {
      case 'amazon':
        return this.createAmazon(config);
      case 'google cloud':
        return this.createGoogleCloud(config);
      case 'local':
        return this.createLocal(config);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  /**
   * Create Amazon Storage Service
   * @param {Object} config Configuration object for Amazon Storage Service
   * @returns {AmazonStorage}
   */
  createAmazon: function (config) {
    return new AmazonStorage(config);
  },

  /**
   * Create Google Cloud Storage Service
   * @param {Object} config Configuration object for Google Cloud Storage Service
   * @returns {GoogleCloudStorage}
   */
  createGoogleCloud: function (config) {
    return new GoogleCloudStorage(config);
  },

  /**
   * Create Local Storage Service
   * @param {Object} config Configuration object for Local Storage Service
   * @returns {LocalStorage}
   */
  createLocal: function (config) {
    return new LocalStorage(config);
  }
};

module.exports = StorageFactory;
