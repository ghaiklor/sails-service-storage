var AWS = require('aws-sdk');
var Promise = require('bluebird');

/**
 * Triggers when Amazon operation is finished
 * @param {Function} resolve
 * @param {Function} reject
 * @param {Object} error
 * @param {Object} data
 * @returns {*}
 * @private
 */
function _onOperationFinished(resolve, reject, error, data) {
  return error ? reject(error) : resolve(data);
}

/**
 * Create new instance of Amazon Storage Service
 * @param {Object} config Configuration object with accessKeyId, secretAccessKey and other
 * @returns {AmazonStorage}
 * @constructor
 */
function AmazonStorage(config) {
  this._config = config || {};
  this._S3 = new AWS.S3(this._config);
}

/**
 * Get meta information about bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.headBucket = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.headBucket(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Create new bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.createBucket = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.createBucket(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Delete existing bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.deleteBucket = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.deleteBucket(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Get list of buckets under account
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.listBuckets = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.listBuckets(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Get meta information about object
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.headObject = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.headObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Download file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.getObject = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.getObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Upload file to Amazon Storage Service
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.putObject = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.putObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Remove file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.deleteObject = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.deleteObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Get list of object in bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.listObjects = function (options) {
  return new Promise(function (resolve, reject) {
    this._S3.listObjects(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

module.exports = AmazonStorage;
