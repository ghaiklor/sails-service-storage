import BaseStorage from 'BaseStorage';
import * as fs from 'fs';
import * as gcloud from 'gcloud';

export default class GCloudStorage extends BaseStorage {
  constructor(options) {
    super();

    this.setKeyFilename(options.keyFilename);
    this.setProjectId(options.projectId);
  }

  upload(options) {
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
  }

  get(options) {
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
  }

  remove(options) {
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
  }

  _getProject() {
    return this._project;
  }

  _setProject(project) {
    this._project = project;
    return this;
  }

  _updateProjectCredentials() {
    this._setProject(gcloud({
      keyFilename: this.getKeyFilename(),
      projectId: this.getProjectId()
    }));

    return this;
  }

  getProjectId() {
    return this.projectId;
  }

  setProjectId(id) {
    this.projectId = id;
    this._updateProjectCredentials();
    return this;
  }

  getKeyFilename() {
    return this.keyFilename;
  }

  setKeyFilename(key) {
    this.keyFilename = key;
    this._updateProjectCredentials();
    return this;
  }
}
