var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Promise = require('bluebird');
var util = require('util');
var BaseStorage = require('./BaseStorage');

var UPLOADS_DIR = 'provider.uploadsDir';

util.inherits(LocalStorage, BaseStorage);

/**
 * Create new local storage instance
 * @constructor
 */
function LocalStorage() {
  BaseStorage.apply(this, arguments);

  this.setProvider(fs);
  this._createUploadsFolder(this.get(UPLOADS_DIR));
}

/**
 * Recursively create uploads folder
 * @param {String} path
 * @returns {LocalStorage}
 * @private
 */
LocalStorage.prototype._createUploadsFolder = function (path) {
  mkdirp.sync(path);
  return this;
};

/**
 * Parse input file and try to make it Buffer
 * @param {String|Buffer} source Source file
 * @returns {Buffer}
 * @private
 */
LocalStorage.prototype._parseFile = function (source) {
  var buffer;

  if (typeof source === 'string') {
    buffer = fs.readFileSync(source);
  } else if (Buffer.isBuffer(source)) {
    buffer = source;
  } else {
    throw new Error('You must pass String|Buffer');
  }

  return buffer;
};

/**
 * Upload file to destination
 * @param {String|Buffer} _source Source file
 * @param {String} _destination Destination
 * @param {Object} [_config] Additional configuration
 * @returns {Promise}
 */
LocalStorage.prototype.upload = function (_source, _destination, _config) {
  var source = this._parseFile(_source);
  var destination = path.resolve(this.get(UPLOADS_DIR), _destination);

  return new Promise(function (resolve, reject) {
    this.getProvider().writeFile(destination, source, function (error) {
      return error ? reject(error) : resolve();
    });
  }.bind(this));
};

/**
 * Get uploaded file
 * @param {String} _source Source file to get
 * @param {Object} [_config] Additional configuration
 * @returns {Promise}
 */
LocalStorage.prototype.download = function (_source, _config) {
  var source = path.resolve(this.get(UPLOADS_DIR), _source);

  return new Promise(function (resolve, reject) {
    this.getProvider().readFile(source, function (error, data) {
      return error ? reject(error) : resolve(data);
    });
  }.bind(this));
};

/**
 * Remove file from storage
 * @param {String} _source Source file to remove
 * @param {Object} [_config]
 * @returns {Promise}
 */
LocalStorage.prototype.remove = function (_source, _config) {
  var source = path.resolve(this.get(UPLOADS_DIR), _source);

  return new Promise(function (resolve, reject) {
    this.getProvider().unlink(source, function (error) {
      return error ? reject(error) : resolve();
    });
  }.bind(this));
};

module.exports = LocalStorage;
