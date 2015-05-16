var assert = require('chai').assert;
var AmazonStorage = require('../lib/AmazonStorage');
var GoogleCloudStorage = require('../lib/GoogleCloudStorage');
var LocalStorage = require('../lib/LocalStorage');
var StorageService = require('../');

describe('Factory Method', function () {
  it('Should properly export', function () {
    assert.isFunction(StorageService);
  });

  it('Should properly create storage instances', function () {
    assert.instanceOf(StorageService('Amazon'), AmazonStorage);
    assert.instanceOf(StorageService('Google Cloud'), GoogleCloudStorage);
    assert.instanceOf(StorageService('Local'), LocalStorage);
  });
});
