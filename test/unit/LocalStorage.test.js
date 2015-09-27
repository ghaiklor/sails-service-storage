import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import sinon from 'sinon';
import LocalStorage from '../../src/LocalStorage';

const PROVIDER_CONFIG = {
  uploads: path.resolve(__dirname, '../uploads')
};

describe('LocalStorage', () => {
  it('Should properly export', () => {
    assert.isFunction(LocalStorage);
  });

  it('Should properly upload file as a path to it', done => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .upload('.editorconfig', '.editorconfig_copy')
      .then(() => {
        assert.ok(fs.existsSync('./test/uploads/.editorconfig_copy'));
        assert.deepEqual(fs.readFileSync('./.editorconfig'), fs.readFileSync('./test/uploads/.editorconfig_copy'));
        done();
      })
      .catch(done)
  });

  it('Should properly upload file as a Buffer', done => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .upload(fs.readFileSync('./.editorconfig'), '.editorconfig_copy_2')
      .then(() => {
        assert.ok(fs.existsSync('./test/uploads/.editorconfig_copy_2'));
        assert.deepEqual(fs.readFileSync('./.editorconfig'), fs.readFileSync('./test/uploads/.editorconfig_copy_2'));
        done();
      })
      .catch(done)
  });

  it('Should properly reject on uploading file', done => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    sinon.stub(storage.getProvider(), 'writeFile', (file, data, cb) => cb('ERROR'));

    storage
      .upload('./.editorconfig', '.editorconfig_copy')
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().writeFile.calledOnce);

        storage.getProvider().writeFile.restore();

        done();
      });
  });

  it('Should properly throw error on uploading unknown file type', () => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    assert.throws(() => storage.upload(true, '.editorconfig_copy'), Error);
  });

  it('Should properly download file', done => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .download('.editorconfig_copy')
      .then(result => {
        assert.instanceOf(result, Buffer);
        done();
      })
      .catch(done);
  });

  it('Should properly reject on download file', done => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    sinon.stub(storage.getProvider(), 'readFile', (source, cb) => cb('ERROR'));

    storage
      .download('.editorconfig_copy')
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().readFile.calledOnce);

        storage.getProvider().readFile.restore();

        done();
      });
  });

  it('Should properly remove file', done => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .remove('.editorconfig_copy')
      .then(() => {
        assert.notOk(fs.existsSync('./test/uploads/.editorconfig_copy'));
        assert.ok(fs.existsSync('./test/uploads/.editorconfig_copy_2'));
        done();
      })
      .catch(done);
  });

  it('Should properly reject on remove file', done => {
    let storage = new LocalStorage(PROVIDER_CONFIG);

    sinon.stub(storage.getProvider(), 'unlink', (path, cb) => cb('ERROR'));

    storage
      .remove('.editorconfig_copy')
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().unlink.calledOnce);

        storage.getProvider().unlink.restore();

        done();
      });
  });
});
