var assert = require('chai').assert;
var AmazonStorage = require('../lib/AmazonStorage');
var GoogleCloudStorage = require('../lib/GoogleCloudStorage');
var LocalStorage = require('../lib/LocalStorage');
var StorageService = require('../');

describe('Factory Method', function () {
  it('Should properly export', function () {
    assert.isObject(StorageService);
    assert.isFunction(StorageService.create);
  });

  it('Should properly create storage instances', function () {
    assert.instanceOf(StorageService.create('Amazon'), AmazonStorage);
    assert.instanceOf(StorageService.create('Google Cloud'), GoogleCloudStorage);
    assert.instanceOf(StorageService.create('Local'), LocalStorage);
  });
});
