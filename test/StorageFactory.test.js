var assert = require('chai').assert;
var StorageFactory = require('../lib/StorageFactory');

describe('StorageFactory', function () {
  it('Should properly export Storage Factory', function () {
    assert.isFunction(StorageFactory);
  });

  it('Should properly create Storage Factory', function () {
    var storage = new StorageFactory();
    assert.instanceOf(storage, StorageFactory);
  });
});
