import { assert } from 'chai';
import BaseStorage from '../../src/BaseStorage';

describe('BaseStorage', () => {
  it('Should properly export', () => {
    assert.isFunction(BaseStorage);
  });

  it('Should properly make objects configurable', () => {
    let storage = new BaseStorage();

    assert.notOk(storage.get('foo'));
    assert.instanceOf(storage.set('foo', 'bar'), BaseStorage);
    assert.instanceOf(storage.set('obj', {foo: 'bar'}), BaseStorage);
    assert.deepEqual(storage.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(storage.get('obj'), {foo: 'bar'});
    assert.equal(storage.get('obj.foo'), 'bar');
    assert.equal(storage.get('foo'), 'bar');
  });

  it('Should properly create storage with pre-defined config', () => {
    let storage = new BaseStorage({
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

  it('Should properly get/set provider', () => {
    let storage = new BaseStorage();

    assert.deepEqual(storage.getProvider(), {});
    assert.instanceOf(storage.setProvider('PROVIDER'), BaseStorage);
    assert.equal(storage.getProvider(), 'PROVIDER');
  });
});
