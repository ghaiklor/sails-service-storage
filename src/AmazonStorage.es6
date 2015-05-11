import * as aws from 'aws-sdk';
import BaseStorage from 'BaseStorage';

export default class AmazonStorage extends BaseStorage {
  constructor(options) {
    super();

    if (!(options.accessKeyId || options.secretAccessKey)) {
      throw new Error('You must provide tokens');
    }

    this.S3 = new aws.S3({
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey
    });
  }

  upload(options) {
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
  }

  get(options) {
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
  }

  remove(options) {
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
  }

  getSignedUrl(options) {
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
  }
}
