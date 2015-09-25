import fs from 'fs';
import { assert } from 'chai';
import sinon from 'sinon';
import AmazonStorage from '../../src/AmazonStorage';

describe('AmazonStorage', () => {
  it('Should properly export Amazon Storage Service', () => {
    assert.isFunction(AmazonStorage);
  });

  it('Should properly create Amazon Storage', () => {
    let storage = new AmazonStorage();
    assert.instanceOf(storage, AmazonStorage);
  });

  it('Should properly upload file', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', (config, cb) => cb(null, 'RESULT'));

    storage
      .upload(new Buffer('test'), 'BUCKET:KEY')
      .then(result => {
        assert.equal(result, 'RESULT');
        assert.ok(storage.getProvider().putObject.calledOnce);
        assert.deepEqual(storage.getProvider().putObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY',
          Body: new Buffer('test')
        });
        assert.isFunction(storage.getProvider().putObject.getCall(0).args[1]);

        storage.getProvider().putObject.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly upload without specifying bucket in .upload()', done => {
    let storage = new AmazonStorage({
      bucket: 'BUCKET'
    });

    sinon.stub(storage.getProvider(), 'putObject', (config, cb) => cb(null, 'RESULT'));

    storage
      .upload(new Buffer('test'), 'KEY')
      .then(result => {
        assert.equal(result, 'RESULT');
        assert.ok(storage.getProvider().putObject.calledOnce);
        assert.deepEqual(storage.getProvider().putObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY',
          Body: new Buffer('test')
        });
        assert.isFunction(storage.getProvider().putObject.getCall(0).args[1]);

        storage.getProvider().putObject.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly upload source as a path to file', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', (config, cb) => cb(null, 'RESULT'));

    storage
      .upload('.editorconfig', 'BUCKET:KEY')
      .then(result => {
        assert.equal(result, 'RESULT');
        assert.ok(storage.getProvider().putObject.calledOnce);
        assert.deepEqual(storage.getProvider().putObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY',
          Body: fs.readFileSync('.editorconfig')
        });
        assert.isFunction(storage.getProvider().putObject.getCall(0).args[1]);

        storage.getProvider().putObject.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly mixin other config in upload', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', (config, cb) => cb(null, 'RESULT'));

    storage
      .upload('.editorconfig', 'BUCKET:KEY', {
        ACL: 'public-read'
      })
      .then(result => {
        assert.equal(result, 'RESULT');
        assert.ok(storage.getProvider().putObject.calledOnce);
        assert.deepEqual(storage.getProvider().putObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY',
          Body: fs.readFileSync('.editorconfig'),
          ACL: 'public-read'
        });
        assert.isFunction(storage.getProvider().putObject.getCall(0).args[1]);

        storage.getProvider().putObject.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly throw error if upload unknown type', () => {
    let storage = new AmazonStorage();

    assert.throws(() => storage.upload(true, 'BUCKET:KEY'), Error);
  });

  it('Should properly reject on file uploading', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', (config, cb) => cb('ERROR'));

    storage
      .upload(new Buffer('test'), 'BUCKET:KEY')
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().putObject.calledOnce);
        assert.deepEqual(storage.getProvider().putObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY',
          Body: new Buffer('test')
        });
        assert.isFunction(storage.getProvider().putObject.getCall(0).args[1]);

        storage.getProvider().putObject.restore();

        done();
      });
  });

  it('Should properly download file', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'getObject', (config, cb) => cb(null, 'OBJECT'));

    storage
      .download('BUCKET:KEY')
      .then(result => {
        assert.equal(result, 'OBJECT');
        assert.ok(storage.getProvider().getObject.calledOnce);
        assert.deepEqual(storage.getProvider().getObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY'
        });
        assert.isFunction(storage.getProvider().getObject.getCall(0).args[1]);

        storage.getProvider().getObject.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on downloading file', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'getObject', (config, cb) => cb('ERROR'));

    storage
      .download('BUCKET:KEY')
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().getObject.calledOnce);
        assert.deepEqual(storage.getProvider().getObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY'
        });
        assert.isFunction(storage.getProvider().getObject.getCall(0).args[1]);

        storage.getProvider().getObject.restore();

        done();
      });
  });

  it('Should properly remove file', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'deleteObject', (config, cb) => cb(null, 'OBJECT'));

    storage
      .remove('BUCKET:KEY')
      .then(result => {
        assert.equal(result, 'OBJECT');
        assert.ok(storage.getProvider().deleteObject.calledOnce);
        assert.deepEqual(storage.getProvider().deleteObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY'
        });
        assert.isFunction(storage.getProvider().deleteObject.getCall(0).args[1]);

        storage.getProvider().deleteObject.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on removing file', done => {
    let storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'deleteObject', (config, cb) => cb('ERROR'));

    storage
      .remove('BUCKET:KEY')
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().deleteObject.calledOnce);
        assert.deepEqual(storage.getProvider().deleteObject.getCall(0).args[0], {
          Bucket: 'BUCKET',
          Key: 'KEY'
        });
        assert.isFunction(storage.getProvider().deleteObject.getCall(0).args[1]);

        storage.getProvider().deleteObject.restore();

        done();
      });
  });
});
