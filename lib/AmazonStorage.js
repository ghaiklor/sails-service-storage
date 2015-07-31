var AWS = require('aws-sdk');
var Promise = require('bluebird');
var util = require('util');
var BaseStorage = require('./BaseStorage');

util.inherits(AmazonStorage, BaseStorage);

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
 * @returns {AmazonStorage}
 * @constructor
 */
function AmazonStorage() {
  BaseStorage.apply(this, arguments);

  this.setProvider(new AWS.S3(this.get()));
}

/**
 * Get meta information about bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.headBucket = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().headBucket(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Create new bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.createBucket = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().createBucket(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Delete existing bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.deleteBucket = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().deleteBucket(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Get list of buckets under account
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.listBuckets = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().listBuckets(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Get meta information about object
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.headObject = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().headObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Download file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.getObject = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().getObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Upload file to Amazon Storage Service
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.putObject = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().putObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Remove file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.deleteObject = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().deleteObject(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

/**
 * Get list of object in bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.listObjects = function (options) {
  return new Promise(function (resolve, reject) {
    this.getProvider().listObjects(options, _onOperationFinished.bind(this, resolve, reject));
  }.bind(this));
};

module.exports = AmazonStorage;
