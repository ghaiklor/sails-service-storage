var _ = require('lodash');

/**
 * Create base instance for storage service
 * @param {Object} [_config]
 * @constructor
 */
function BaseStorage(_config) {
  this._config = {};

  _.forOwn(_config, function (value, key) {
    this.set(key, value);
  }.bind(this));
}

/**
 * Get configuration value
 * @param {String} [path]
 * @returns {*}
 */
BaseStorage.prototype.get = function (path) {
  return typeof path === 'undefined' ? this._config : _.get(this._config, path);
};

/**
 * Set configuration value
 * @param {String} path
 * @param {*} value
 * @returns {BaseStorage}
 */
BaseStorage.prototype.set = function (path, value) {
  _.set(this._config, path, value);
  return this;
};

/**
 * Get storage provider
 * @returns {*}
 */
BaseStorage.prototype.getProvider = function () {
  return this._provider;
};

/**
 * Set new provider to this storage
 * @param {*} provider
 * @returns {BaseStorage}
 */
BaseStorage.prototype.setProvider = function (provider) {
  this._provider = provider;
  return this;
};

BaseStorage.prototype.upload = _;
BaseStorage.prototype.download = _;
BaseStorage.prototype.remove = _;

module.exports = BaseStorage;
