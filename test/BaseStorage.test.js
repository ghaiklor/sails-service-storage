var assert = require('chai').assert;
var BaseStorage = require('../lib/BaseStorage');

describe('BaseStorage', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseStorage);
    assert.isFunction(BaseStorage.prototype.get);
    assert.isFunction(BaseStorage.prototype.set);
    assert.isFunction(BaseStorage.prototype.getProvider);
    assert.isFunction(BaseStorage.prototype.setProvider);
    assert.isFunction(BaseStorage.prototype.upload);
    assert.isFunction(BaseStorage.prototype.download);
    assert.isFunction(BaseStorage.prototype.remove);
  });

  it('Should properly make objects configurable', function () {
    var storage = new BaseStorage();

    assert.notOk(storage.get('foo'));
    assert.instanceOf(storage.set('foo', 'bar'), BaseStorage);
    assert.instanceOf(storage.set('obj', {foo: 'bar'}), BaseStorage);
    assert.deepEqual(storage.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(storage.get('obj'), {foo: 'bar'});
    assert.equal(storage.get('obj.foo'), 'bar');
    assert.equal(storage.get('foo'), 'bar');
  });

  it('Should properly create storage with pre-defined config', function () {
    var storage = new BaseStorage({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.equal(storage.get('foo'), 'bar');
    assert.equal(storage.get('obj.foo'), 'bar');
    assert.deepEqual(storage.get('obj'), {foo: 'bar'});
    assert.notOk(storage.get('NOT_EXISTS'));
  });

  it('Should properly get/set provider', function () {
    var storage = new BaseStorage();

    assert.notOk(storage.getProvider());
    assert.instanceOf(storage.setProvider('PROVIDER'), BaseStorage);
    assert.equal(storage.getProvider(), 'PROVIDER');
  });
});
