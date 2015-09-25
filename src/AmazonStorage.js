import fs from 'fs';
import AWS from 'aws-sdk';
import _ from 'lodash';
import BaseStorage from './BaseStorage';

export default class AmazonStorage extends BaseStorage {
  constructor(...args) {
    super(...args);

    this.setProvider(new AWS.S3(this.get('provider')));
  }

  /**
   * Parse source and try to make it Buffer
   * @param {String|Buffer} source Source file
   * @returns {Buffer}
   * @private
   */
  parseFile(source) {
    let buffer;

    if (typeof source === 'string') {
      buffer = fs.readFileSync(source);
    } else if (Buffer.isBuffer(source)) {
      buffer = source;
    } else {
      throw new Error('You can pass only String|Buffer');
    }

    return buffer;
  }

  /**
   * Parse destination string and get Bucket and Key
   * @param {String} destination Destination string
   * @returns {{bucket: String, key: String}}
   * @private
   */
  parseBucketAndKey(destination) {
    let isBucketDefined = destination.indexOf(':') !== -1;
    let bucket = isBucketDefined ? destination.split(':')[0] : this.get('bucket');
    let key = isBucketDefined ? destination.split(':')[1] : destination;

    return {
      bucket: bucket,
      key: key
    }
  }

  /**
   * Upload file to Amazon Storage Service
   * @param {String|Buffer} _source Source file
   * @param {String} _destination Destination path for file
   * @param {Object} [_config] Additional configuration object for putObject
   * @returns {Promise}
   */
  upload(_source, _destination, _config) {
    let source = this.parseFile(_source);
    let destination = this.parseBucketAndKey(_destination);
    let config = _.merge({
      Bucket: destination.bucket,
      Key: destination.key,
      Body: source
    }, _config);

    return new Promise((resolve, reject) => {
      this.getProvider().putObject(config, (error, result) => error ? reject(error) : resolve(result));
    });
  }

  /**
   * Download file from Amazon Storage Service
   * @param {String} _source Source file that need to download
   * @param {Object} [_config] Additional configuration for getObject
   * @returns {Promise}
   */
  download(_source, _config) {
    let source = this.parseBucketAndKey(_source);
    let config = _.merge({
      Bucket: source.bucket,
      Key: source.key
    }, _config);

    return new Promise((resolve, reject) => {
      this.getProvider().getObject(config, (error, result) => error ? reject(error) : resolve(result));
    });
  }

  /**
   * Remove file from Amazon Storage Service
   * @param {String} _source Source file that need to remove
   * @param {Object} [_config] Additional configuration object for deleteObject
   * @returns {Promise}
   */
  remove(_source, _config) {
    let source = this.parseBucketAndKey(_source);
    let config = _.merge({
      Bucket: source.bucket,
      Key: source.key
    }, _config);

    return new Promise((resolve, reject) => {
      this.getProvider().deleteObject(config, (error, result) => error ? reject(error) : resolve(result));
    });
  }
}
