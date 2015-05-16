var assert = require('chai').assert;
var AmazonStorage = require('../lib/AmazonStorage');

var amazonConfig = {
  accessKeyId: '1234',
  secretAccessKey: '1234'
};

describe('AmazonStorage', function () {
  it('Should properly export Amazon Storage Service', function () {
    assert.isFunction(AmazonStorage);
  });

  //it('Should properly throw exception', function () {
  //  assert.throws(function () {
  //    return new AmazonStorage();
  //  }, Error);
  //});

  it('Should properly create Amazon Storage', function () {
    var storage = new AmazonStorage(amazonConfig);
    assert.instanceOf(storage, AmazonStorage);
  });
});
