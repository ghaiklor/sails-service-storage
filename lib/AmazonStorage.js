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
  if (error) {
    return reject(error);
  } else {
    return resolve(data);
  }
}

/**
 * Create new instance of Amazon Storage Service
 * @param {Object} config Configuration object with accessKeyId, secretAccessKey and other
 * @returns {AmazonStorage}
 * @constructor
 */
function AmazonStorage(config) {
  if (!(config.accessKeyId || config.secretAccessKey)) {
    throw new Error('You must provide accessKeyId and secretAccessKey');
  }

  this._config = config;
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
 * Get meta information about object
 * @param {Object} options
 * @returns {*}
 */
AmazonStorage.prototype.headObject = function (options) {
  var S3 = this._S3;

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
  var S3 = this._S3;

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
  var S3 = this._S3;

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
  var S3 = this._S3;

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
  var S3 = this._S3;

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
  var S3 = this._S3;

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
