var assert = require('chai').assert;
var LocalStorage = require('../lib/LocalStorage');

describe('LocalStorage', function () {
  it('Should properly export Local Storage Service', function () {
    assert.isFunction(LocalStorage);
  });
});
