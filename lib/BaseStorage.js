/**
 * Message that printing when method is not implemented
 * @type {String}
 */
var IMPLEMENT_MESSAGE = 'This method is not implemented';

/**
 * Base class of Storage Service
 * @constructor
 */
function BaseStorage() {
}

BaseStorage.prototype.upload = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

BaseStorage.prototype.download = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

BaseStorage.prototype.remove = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

module.exports = BaseStorage;
