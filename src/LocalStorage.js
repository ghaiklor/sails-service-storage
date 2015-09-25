import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import BaseStorage from './BaseStorage';

const UPLOADS_DIR = 'provider.uploadsDir';

export default class LocalStorage extends BaseStorage {
  constructor(...args) {
    super(...args);

    this.setProvider(fs);
    this.createUploadsFolder(this.get(UPLOADS_DIR));
  }

  /**
   * Recursively create uploads folder
   * @param {String} path
   * @returns {LocalStorage}
   * @private
   */
  createUploadsFolder(path) {
    mkdirp.sync(path);
    return this;
  }

  /**
   * Parse input file and try to make it Buffer
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
      throw new Error('You must pass String|Buffer');
    }

    return buffer;
  }

  /**
   * Upload file to destination
   * @param {String|Buffer} _source Source file
   * @param {String} _destination Destination
   * @param {Object} [_config] Additional configuration
   * @returns {Promise}
   */
  upload(_source, _destination, _config) {
    let source = this.parseFile(_source);
    let destination = path.resolve(this.get(UPLOADS_DIR), _destination);

    return new Promise((resolve, reject) => {
      this.getProvider().writeFile(destination, source, error => error ? reject(error) : resolve());
    });
  }

  /**
   * Get uploaded file
   * @param {String} _source Source file to get
   * @param {Object} [_config] Additional configuration
   * @returns {Promise}
   */
  download(_source, _config) {
    let source = path.resolve(this.get(UPLOADS_DIR), _source);

    return new Promise((resolve, reject) => {
      this.getProvider().readFile(source, (error, data) => error ? reject(error) : resolve(data));
    });
  }

  /**
   * Remove file from storage
   * @param {String} _source Source file to remove
   * @param {Object} [_config]
   * @returns {Promise}
   */
  remove(_source, _config) {
    var source = path.resolve(this.get(UPLOADS_DIR), _source);

    return new Promise((resolve, reject) => {
      this.getProvider().unlink(source, error => error ? reject(error) : resolve());
    });
  }
}
