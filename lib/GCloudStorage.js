var BaseStorage = require('./BaseStorage');
var util = require('util');
var fs = require('fs');
var gcloud = require('gcloud');

util.inherits(GCloudStorage, BaseStorage);

function GCloudStorage() {
  BaseStorage.apply(this, arguments);

  this.setKeyFilename(options.keyFilename);
  this.setProjectId(options.projectId);
}

GCloudStorage.prototype.upload = function (options) {
  var defer = Q.defer();
  var bucket = this._getProject().storage().bucket(options.bucket);
  var file = bucket.file(options.key);

  fs.createReadStream(options.body)
    .pipe(file.createWriteStream())
    .on('error', function (error) {
      defer.reject(error);
    })
    .on('end', function () {
      defer.resolve();
    });

  return defer.promise;
};

GCloudStorage.prototype.get = function (options) {
  var defer = Q.defer();
  var bucket = this._getProject().storage().bucket(options.bucket);
  var file = bucket.file(options.key);
  var buffer = '';

  file.createReadStream()
    .on('data', function (data) {
      buffer += data;
    })
    .on('end', function () {
      defer.resolve(new Buffer(buffer));
    })
    .on('error', function (error) {
      defer.reject(error);
    });

  return defer.promise;
};

GCloudStorage.prototype.remove = function (options) {
  var defer = Q.defer();
  var bucket = this._getProject().storage().bucket(options.bucket);
  var file = bucket.file(options.key);

  file.delete(function (error) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve();
    }
  });

  return defer.promise;
};

GCloudStorage.prototype._getProject = function () {
  return this._project;
};

GCloudStorage.prototype._setProject = function (project) {
  this._project = project;
  return this;
};

GCloudStorage.prototype._updateProjectCredentials = function () {
  this._setProject(gcloud({
    keyFilename: this.getKeyFilename(),
    projectId: this.getProjectId()
  }));

  return this;
};

GCloudStorage.prototype._getProjectId = function () {
  return this.projectId;
};

GCloudStorage.prototype._setProjectId = function (id) {
  this.projectId = id;
  this._updateProjectCredentials();
  return this;
};

GCloudStorage.prototype.getKeyFilename = function () {
  return this.keyFilename;
};

GCloudStorage.prototype.setKeyFilename = function (key) {
  this.keyFilename = key;
  this._updateProjectCredentials();
  return this;
};

module.exports = GCloudStorage;
