var storage = {
  amazon: require('./AmazonStorage')
};

module.exports = {
  /**
   * Create specified storage instance
   * @param type
   * @param config
   * @returns {*}
   */
  create: function (type, config) {
    if (storage[type.toLowerCase()] instanceof Function) {
      return new storage[type.toLowerCase()](config);
    } else {
      throw new Error('Unrecognized storage type -> ' + type);
    }
  },

  AmazonStorage: storage.amazon
};
