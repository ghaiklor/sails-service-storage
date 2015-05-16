var assert = require('chai').assert;
var GCloudStorage = require('../lib/GoogleCloudStorage');

describe('GoogleCloudStorage', function () {
  it('Should properly export Google Cloud Storage Service', function () {
    assert.isFunction(GCloudStorage);
  });
});
