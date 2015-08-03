var assert = require('chai').assert;
var StorageService = require('../');
var AmazonStorage = StorageService.AmazonStorage;

describe('StorageService', function () {
  it('Should properly export', function () {
    assert.isObject(StorageService);
    assert.isFunction(StorageService.create);
    assert.isFunction(StorageService.AmazonStorage);
  });

  it('Should properly create storage instances', function () {
    assert.instanceOf(StorageService.create('amazon'), AmazonStorage);
  });

  it('Should properly throw error on unrecognized type', function () {
    assert.throws(function () {
      StorageService.create('NOT_EXISTS');
    }, Error);
  });
});
