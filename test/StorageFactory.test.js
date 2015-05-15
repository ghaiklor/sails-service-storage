var assert = require('chai').assert;
var StorageFactory = require('../lib/StorageFactory');

describe('StorageFactory', function () {
  it('Should properly export Storage Factory Service', function () {
    assert.isFunction(StorageFactory);
  });
});
