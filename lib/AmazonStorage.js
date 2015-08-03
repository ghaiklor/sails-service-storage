var fs = require('fs');
var AWS = require('aws-sdk');
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var BaseStorage = require('./BaseStorage');

util.inherits(AmazonStorage, BaseStorage);

/**
 * Create new instance of Amazon Storage Service
 * @returns {AmazonStorage}
 * @constructor
 */
function AmazonStorage() {
  BaseStorage.apply(this, arguments);

  this.setProvider(new AWS.S3(this.get('provider')));
}

/**
 * Parse source and try to make it Buffer
 * @param {String|Buffer} source Source file
 * @returns {Buffer}
 * @private
 */
AmazonStorage.prototype._parseFile = function (source) {
  var buffer;

  if (typeof source === 'string') {
    buffer = fs.readFileSync(source);
  } else if (Buffer.isBuffer(source)) {
    buffer = source;
  } else {
    throw new Error('You can pass only String|Buffer');
  }

  return buffer;
};

/**
 * Parse destination string and get Bucket and Key
 * @param {String} destination Destination string
 * @returns {{bucket: String, key: String}}
 * @private
 */
AmazonStorage.prototype._parseBucketAndKey = function (destination) {
  var isBucketDefined = destination.indexOf(':') !== -1;
  var bucket = isBucketDefined ? destination.split(':')[0] : this.get('bucket');
  var key = isBucketDefined ? destination.split(':')[1] : destination;

  return {
    bucket: bucket,
    key: key
  }
};

/**
 * Upload file to Amazon Storage Service
 * @param {String|Buffer} _source Source file
 * @param {String} _destination Destination path for file
 * @param {Object} [_config] Additional configuration object for putObject
 * @returns {Promise}
 */
AmazonStorage.prototype.upload = function (_source, _destination, _config) {
  var source = this._parseFile(_source);
  var destination = this._parseBucketAndKey(_destination);
  var config = _.merge({
    Bucket: destination.bucket,
    Key: destination.key,
    Body: source
  }, _config);

  return new Promise(function (resolve, reject) {
    this.getProvider().putObject(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

/**
 * Download file from Amazon Storage Service
 * @param {String} _source Source file that need to download
 * @param {Object} [_config] Additional configuration for getObject
 * @returns {Promise}
 */
AmazonStorage.prototype.download = function (_source, _config) {
  var source = this._parseBucketAndKey(_source);
  var config = _.merge({
    Bucket: source.bucket,
    Key: source.key
  }, _config);

  return new Promise(function (resolve, reject) {
    this.getProvider().getObject(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

/**
 * Remove file from Amazon Storage Service
 * @param {String} _source Source file that need to remove
 * @param {Object} [_config] Additional configuration object for deleteObject
 * @returns {Promise}
 */
AmazonStorage.prototype.remove = function (_source, _config) {
  var source = this._parseBucketAndKey(_source);
  var config = _.merge({
    Bucket: source.bucket,
    Key: source.key
  }, _config);

  return new Promise(function (resolve, reject) {
    this.getProvider().deleteObject(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = AmazonStorage;
