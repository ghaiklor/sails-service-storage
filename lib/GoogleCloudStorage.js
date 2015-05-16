var fs = require('fs');
var gcloud = require('gcloud');

function GoogleCloudStorage(options) {
  this.setKeyFilename(options.keyFilename);
  this.setProjectId(options.projectId);
}

GoogleCloudStorage.prototype.upload = function (options) {
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

GoogleCloudStorage.prototype.download = function (options) {
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

GoogleCloudStorage.prototype.remove = function (options) {
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

GoogleCloudStorage.prototype._getProject = function () {
  return this._project;
};

GoogleCloudStorage.prototype._setProject = function (project) {
  this._project = project;
  return this;
};

GoogleCloudStorage.prototype._updateProjectCredentials = function () {
  this._setProject(gcloud({
    keyFilename: this.getKeyFilename(),
    projectId: this.getProjectId()
  }));

  return this;
};

GoogleCloudStorage.prototype._getProjectId = function () {
  return this.projectId;
};

GoogleCloudStorage.prototype._setProjectId = function (id) {
  this.projectId = id;
  this._updateProjectCredentials();
  return this;
};

GoogleCloudStorage.prototype.getKeyFilename = function () {
  return this.keyFilename;
};

GoogleCloudStorage.prototype.setKeyFilename = function (key) {
  this.keyFilename = key;
  this._updateProjectCredentials();
  return this;
};

module.exports = GoogleCloudStorage;
