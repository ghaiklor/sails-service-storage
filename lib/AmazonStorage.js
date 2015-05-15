var BaseStorage = require('./BaseStorage');
var util = require('util');
var aws = require('aws-sdk');

util.inherits(AmazonStorage, BaseStorage);

function AmazonStorage() {
  BaseStorage.apply(this, arguments);

  if (!(options.accessKeyId || options.secretAccessKey)) {
    throw new Error('You must provide tokens');
  }

  this.S3 = new aws.S3({
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey
  });
}

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
      defer.resolve(data);
    }
  });

  return defer.promise;
};

AmazonStorage.prototype.get = function (options) {
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

AmazonStorage.prototype.getSignedUrl = function (options) {
  var defer = Q.defer();

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

  return defer.promise;
};

module.exports = AmazonStorage;
