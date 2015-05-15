var util = require('util');
var aws = require('aws-sdk');
var BaseStorage = require('./BaseStorage');

util.inherits(AmazonStorage, BaseStorage);

/**
 * Create new instance of Amazon Storage Service
 * @constructor
 */
function AmazonStorage(options) {
  BaseStorage.call(this, options);

  if (!(options.accessKeyId || options.secretAccessKey)) {
    throw new Error('You must provide accessKeyId and secretAccessKey');
  }

  this.S3 = new aws.S3({
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey
  });
}

/**
 * Upload file to Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.upload = function (options) {
  var defer = Q.defer();

  this.S3.putObject({
    Bucket: options.bucket,
    Key: options.key,
    Body: options.body
  }, function (error, data) {
    if (error) {
      defer.reject(error);
    } else {
      this.S3.getSignedUrl('getObject', {
        Bucket: options.bucket,
        Key: options.key
      }, function (error, url) {
        if (error) {
          defer.reject(error);
        } else {
          defer.resolve(url);
        }
      });
    }
  }.bind(this));

  return defer.promise;
};

/**
 * Download file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.download = function (options) {
  var defer = Q.defer();

  this.S3.getObject({
    Bucket: options.bucket,
    Key: options.key
  }, function (error, data) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(data);
    }
  });

  return defer.promise;
};

/**
 * Remove file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.remove = function (options) {
  var defer = Q.defer();

  this.S3.deleteObject({
    Bucket: options.bucket,
    Key: options.key
  }, function (error, data) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(data);
    }
  });

  return defer.promise;
};

module.exports = AmazonStorage;
