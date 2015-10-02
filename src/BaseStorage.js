import _ from 'lodash';

export default class BaseStorage {
  constructor(_config) {
    this._config = {};
    this._provider = {};

    _.assign(this._config, _config);
  }

  /**
   * Get configuration value
   * @param {String} [path]
   * @returns {*}
   */
  get(path) {
    return typeof path === 'undefined' ? this._config : _.get(this._config, path);
  }

  /**
   * Set configuration value
   * @param {String} path
   * @param {*} value
   * @returns {BaseStorage}
   */
  set(path, value) {
    _.set(this._config, path, value);
    return this;
  }

  /**
   * Get storage provider
   * @returns {*}
   */
  getProvider() {
    return this._provider;
  }

  /**
   * Set new provider to this storage
   * @param {*} provider
   * @returns {BaseStorage}
   */
  setProvider(provider) {
    this._provider = provider;
    return this;
  }
}
