import { assert } from 'chai';
import StorageService from '../../src/index';
import AmazonStorage from '../../src/AmazonStorage';
import LocalStorage from '../../src/LocalStorage';

describe('StorageService', () => {
  it('Should properly export', () => {
    assert.isFunction(StorageService);
  });

  it('Should properly create storage instances', () => {
    assert.instanceOf(StorageService('amazon'), AmazonStorage);
    assert.instanceOf(StorageService('local'), LocalStorage);
  });

  it('Should properly throw error on unrecognized type', () => {
    assert.throws(() => StorageService.create('NOT_EXISTS'), Error);
  });
});
