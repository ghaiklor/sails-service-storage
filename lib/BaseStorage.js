/**
 * Message that prints out when method is not implemented
 * @type {String}
 */
var IMPLEMENT_MESSAGE = 'Method is not implemented';

/**
 * Base class of Storage Service
 * @constructor
 */
function BaseStorage(config) {
  this.setConfig(config);
}

BaseStorage.prototype.getConfig = function (key) {

};

BaseStorage.prototype.setConfig = function (config) {

};

/**
 * Upload object to storage
 */
BaseStorage.prototype.upload = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

/**
 * Download object from storage
 */
BaseStorage.prototype.download = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

/**
 * Remove object from storage
 */
BaseStorage.prototype.remove = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

module.exports = BaseStorage;
