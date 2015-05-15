var assert = require('chai').assert;
var BaseStorage = require('../lib/BaseStorage');

describe('BaseStorage', function () {
  it('Should properly export class', function () {
    assert.isFunction(BaseStorage, 'BaseStorage should be a function');
  });
});
