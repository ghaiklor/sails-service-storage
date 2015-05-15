var assert = require('chai').assert;
var AmazonStorage = require('../lib/AmazonStorage');

describe('AmazonStorage', function () {
  it('Should properly export Amazon Storage Service', function () {
    assert.isFunction(AmazonStorage);
    assert.instanceOf(new AmazonStorage(), AmazonStorage);
  });

  it('Should properly throw exception', function () {
    assert.throws(function () {
      return new AmazonStorage();
    }, Error);
  });

  it('Should properly create Amazon Storage', function () {
    var storage = new AmazonStorage();
    assert.instanceOf(storage, AmazonStorage);
  });
});
