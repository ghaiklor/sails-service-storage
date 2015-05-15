var assert = require('chai').assert;
var GCloudStorage = require('../lib/GCloudStorage');

describe('GCloudStorage', function () {
  it('Should properly export Google Cloud Storage Service', function () {
    assert.isFunction(GCloudStorage);
  });
});
