var assert = require('chai').assert;
var GoogleCloudStorage = require('../lib/GoogleCloudStorage');

describe('GoogleCloudStorage', function () {
  it('Should properly export Google Cloud Storage Service', function () {
    assert.isFunction(GoogleCloudStorage);
  });

  it('Should properly create new instance', function () {
    var storage = new GoogleCloudStorage();
    assert.instanceOf(storage, GoogleCloudStorage);
  });
});
