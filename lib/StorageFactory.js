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
  create: function (options) {
    if (typeof this['create' + options.type.toLowerCase()] == 'function') {
      return this['create' + options.type].apply(this, arguments);
    } else {
      throw new Error('Unrecognized type -> ' + options.type);
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
