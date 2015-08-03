var fs = require('fs');
var assert = require('chai').assert;
var sinon = require('sinon');
var AmazonStorage = require('../lib/AmazonStorage');

describe('AmazonStorage', function () {
  it('Should properly export Amazon Storage Service', function () {
    assert.isFunction(AmazonStorage);
  });

  it('Should properly create Amazon Storage', function () {
    var storage = new AmazonStorage();
    assert.instanceOf(storage, AmazonStorage);
  });

  it('Should properly upload file', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', function (config, cb) {
      cb(null, 'RESULT');
    });

    storage
      .upload(new Buffer('test'), 'BUCKET:KEY')
      .then(function (result) {
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

  it('Should properly upload without specifying bucket in .upload()', function (done) {
    var storage = new AmazonStorage({
      bucket: 'BUCKET'
    });

    sinon.stub(storage.getProvider(), 'putObject', function (config, cb) {
      cb(null, 'RESULT');
    });

    storage
      .upload(new Buffer('test'), 'KEY')
      .then(function (result) {
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

  it('Should properly upload source as a path to file', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', function (config, cb) {
      cb(null, 'RESULT');
    });

    storage
      .upload('.editorconfig', 'BUCKET:KEY')
      .then(function (result) {
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

  it('Should properly mixin other config in upload', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', function (config, cb) {
      cb(null, 'RESULT');
    });

    storage
      .upload('.editorconfig', 'BUCKET:KEY', {
        ACL: 'public-read'
      })
      .then(function (result) {
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

  it('Should properly throw error if upload unknown type', function () {
    var storage = new AmazonStorage();

    assert.throws(function () {
      storage.upload(true, 'BUCKET:KEY');
    }, Error);
  });

  it('Should properly reject on file uploading', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'putObject', function (config, cb) {
      cb('ERROR');
    });

    storage
      .upload(new Buffer('test'), 'BUCKET:KEY')
      .then(done)
      .catch(function (error) {
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

  it('Should properly download file', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'getObject', function (config, cb) {
      cb(null, 'OBJECT')
    });

    storage
      .download('BUCKET:KEY')
      .then(function (result) {
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

  it('Should properly reject on downloading file', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'getObject', function (config, cb) {
      cb('ERROR')
    });

    storage
      .download('BUCKET:KEY')
      .then(done)
      .catch(function (error) {
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

  it('Should properly remove file', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'deleteObject', function (config, cb) {
      cb(null, 'OBJECT')
    });

    storage
      .remove('BUCKET:KEY')
      .then(function (result) {
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

  it('Should properly reject on removing file', function (done) {
    var storage = new AmazonStorage();

    sinon.stub(storage.getProvider(), 'deleteObject', function (config, cb) {
      cb('ERROR')
    });

    storage
      .remove('BUCKET:KEY')
      .then(done)
      .catch(function (error) {
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
