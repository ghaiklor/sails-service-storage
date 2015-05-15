var AmazonStorage = require('./AmazonStorage');
var GCloudStorage = require('./GCloudStorage');
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
   * @param {Object} options
   * @returns {*}
   */
  create: function (type, options) {
    if (typeof this['create' + type] == 'function') {
      return this['create' + type].apply(this, arguments);
    } else {
      throw new Error('Unrecognized type -> ' + type);
    }
  },

  /**
   * Create Amazon Storage Service
   * @returns {exports|module.exports}
   */
  createAmazon: function () {
    return new AmazonStorage();
  },

  /**
   * Create Google Cloud Storage Service
   * @returns {GCloudStorage}
   */
  createGCloud: function () {
    return new GCloudStorage();
  },

  createLocal: function () {
    return new LocalStorage();
  }
};

module.exports = StorageFactory;
