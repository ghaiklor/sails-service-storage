var assert = require('chai').assert;
var AmazonStorage = require('../lib/AmazonStorage');
var GCloudStorage = require('../lib/GoogleCloudStorage');
var LocalStorage = require('../lib/LocalStorage');
var StorageFactory = require('../lib/StorageFactory');

describe('StorageFactory', function () {
  it('Should properly export Storage Factory', function () {
    assert.isFunction(StorageFactory);
  });

  it('Should properly create Storage Factory', function () {
    var storage = new StorageFactory();
    assert.instanceOf(storage, StorageFactory);
  });

  it('Should properly create some storage instance', function () {
    var storage = new StorageFactory();
    var amazonStorage = storage.create('amazon', {
      accessKeyId: '1234',
      secretAccessKey: '1234'
    });
    assert.instanceOf(amazonStorage, AmazonStorage);
    assert.isFunction(amazonStorage.upload);
  });

  it('Should properly create StorageFactory with predefined config', function () {
    var storage = new StorageFactory({
      accessKeyId: '1234',
      secretAccessKey: '1234'
    });

    var amazonStorage = storage.create('amazon');
    assert.instanceOf(amazonStorage, AmazonStorage);
    assert.isFunction(amazonStorage.upload);
  });
});
