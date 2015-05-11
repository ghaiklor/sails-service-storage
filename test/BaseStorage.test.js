var assert = require('chai').assert;
var BaseStorage = require('../src/BaseStorage.es6');

describe('BaseStorage', function () {
  it('Should properly export class', function () {
    assert.isFunction(BaseStorage, 'BaseStorage should be a function');
  });
});
