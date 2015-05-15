var assert = require('chai').assert;
var BaseStorage = require('../lib/BaseStorage');

describe('BaseStorage', function () {
  it('Should properly export Base Storage', function () {
    assert.isFunction(BaseStorage);
  });
});
