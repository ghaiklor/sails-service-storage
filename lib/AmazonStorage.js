var util = require('util');
var Promise = require('bluebird');
var AWS = require('aws-sdk');
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

  this._setS3(options);
}

/**
 * Get S3 instance
 * @returns {*}
 * @private
 */
AmazonStorage.prototype._getS3 = function () {
  return this._S3;
};

/**
 * Set new S3 instance
 * @param {AWS.S3|Object} S3
 * @returns {AmazonStorage}
 * @private
 */
AmazonStorage.prototype._setS3 = function (S3) {
  this._S3 = S3 instanceof AWS.S3 ? S3 : new AWS.S3(S3);
  return this;
};

/**
 * Create new bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.createBucket = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.createBucket(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/**
 * Delete existing bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.deleteBucket = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.deleteBucket(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/**
 * Get meta information about bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.headBucket = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.headBucket(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/**
 * Get meta information about object
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.headObject = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.headObject(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/**
 * Get list of buckets under account
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.listBuckets = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.listBuckets(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/**
 * Get list of object in bucket
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.listObjects = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.listObjects(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/**
 * Upload file to Amazon Storage Service
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.upload = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.putObject(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        S3.getSignedUrl('getObject', options, function (error, url) {
          if (error) {
            return reject(error);
          } else {
            return resolve({
              url: url,
              data: data
            });
          }
        });
      }
    });
  });
};

/**
 * Download file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.download = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.getObject(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/**
 * Remove file from Amazon Storage Service
 * @param options
 * @returns {*}
 */
AmazonStorage.prototype.remove = function (options) {
  var S3 = this._getS3();

  return new Promise(function (resolve, reject) {
    S3.deleteObject(options, function (error, data) {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

module.exports = AmazonStorage;
