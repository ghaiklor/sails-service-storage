var fs = require('fs');
var path = require('path');
var assert = require('chai').assert;
var sinon = require('sinon');
var LocalStorage = require('../lib/LocalStorage');

var PROVIDER_CONFIG = {
  provider: {
    uploadsDir: path.resolve(__dirname, '../uploads')
  }
};

describe('LocalStorage', function () {
  it('Should properly export', function () {
    assert.isFunction(LocalStorage);
  });

  it('Should properly upload file as a path to it', function (done) {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .upload('./.editorconfig', '.editorconfig_copy')
      .then(function () {
        assert.ok(fs.existsSync('./uploads/.editorconfig_copy'));
        assert.deepEqual(fs.readFileSync('./.editorconfig'), fs.readFileSync('./uploads/.editorconfig_copy'));
        done();
      })
      .catch(done)
  });

  it('Should properly upload file as a Buffer', function (done) {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .upload(fs.readFileSync('./.editorconfig'), '.editorconfig_copy_2')
      .then(function () {
        assert.ok(fs.existsSync('./uploads/.editorconfig_copy_2'));
        assert.deepEqual(fs.readFileSync('./.editorconfig'), fs.readFileSync('./uploads/.editorconfig_copy_2'));
        done();
      })
      .catch(done)
  });

  it('Should properly reject on uploading file', function (done) {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    sinon.stub(storage.getProvider(), 'writeFile', function (file, data, cb) {
      cb('ERROR');
    });

    storage
      .upload('./.editorconfig', '.editorconfig_copy')
      .then(done)
      .catch(function (error) {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().writeFile.calledOnce);

        storage.getProvider().writeFile.restore();

        done();
      });
  });

  it('Should properly throw error on uploading unknown file type', function () {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    assert.throws(function () {
      storage.upload(true, '.editorconfig_copy')
    }, Error);
  });

  it('Should properly download file', function (done) {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .download('.editorconfig_copy')
      .then(function (result) {
        assert.instanceOf(result, Buffer);
        done();
      })
      .catch(done);
  });

  it('Should properly reject on download file', function (done) {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    sinon.stub(storage.getProvider(), 'readFile', function (source, cb) {
      cb('ERROR');
    });

    storage
      .download('.editorconfig_copy')
      .then(done)
      .catch(function (error) {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().readFile.calledOnce);

        storage.getProvider().readFile.restore();

        done();
      });
  });

  it('Should properly remove file', function (done) {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    storage
      .remove('.editorconfig_copy')
      .then(function () {
        assert.notOk(fs.existsSync('./uploads/.editorconfig_copy'));
        assert.ok(fs.existsSync('./uploads/.editorconfig_copy_2'));
        done();
      })
      .catch(done);
  });

  it('Should properly reject on remove file', function (done) {
    var storage = new LocalStorage(PROVIDER_CONFIG);

    sinon.stub(storage.getProvider(), 'unlink', function (path, cb) {
      cb('ERROR');
    });

    storage
      .remove('.editorconfig_copy')
      .then(done)
      .catch(function (error) {
        assert.equal(error, 'ERROR');
        assert.ok(storage.getProvider().unlink.calledOnce);

        storage.getProvider().unlink.restore();

        done();
      });
  });
});
