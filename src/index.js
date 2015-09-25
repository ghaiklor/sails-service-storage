import AmazonStorage from './AmazonStorage';
import LocalStorage from './LocalStorage';

const storage = {
  amazon: AmazonStorage,
  local: LocalStorage
};

/**
 * Create specified storage instance
 * @param {String} type
 * @param {Object} config
 * @returns {*}
 */
export default function (type, config) {
  if (storage[type.toLowerCase()] instanceof Function) {
    return new storage[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized storage type -> ' + type);
  }
}
