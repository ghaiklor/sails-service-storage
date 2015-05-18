var fs = require('fs');
var Promise = require('bluebird');
var gcloud = require('gcloud');

/**
 * Create new Google Cloud Storage Service
 * @param config
 * @constructor
 */
function GoogleCloudStorage(config) {
  this._config = config || {};
  this._setKeyFilename(this._config.keyFilename);
  this._setProjectId(this._config.projectId);
}

/**
 * Put object to storage
 * @param {Object} options
 * @returns {*}
 */
GoogleCloudStorage.prototype.putObject = function (options) {
  var bucket = this._getProject().storage().bucket(options.bucket);
  var file = bucket.file(options.key);

  return new Promise(function (resolve, reject) {
    fs.createReadStream(options.body).pipe(file.createWriteStream()).on('error', reject).on('end', resolve);
  });
};

/**
 * Get object from storage
 * @param {Object} options
 * @returns {*}
 */
GoogleCloudStorage.prototype.getObject = function (options) {
  var bucket = this._getProject().storage().bucket(options.bucket);
  var file = bucket.file(options.key);
  var buffer;

  return new Promise(function (resolve, reject) {
    file.createReadStream()
      .on('data', function (data) {
        buffer += data;
      })
      .on('end', function () {
        resolve(new Buffer(buffer));
      })
      .on('error', reject);
  });
};

/**
 * Delete object from storage
 * @param {Object} options
 * @returns {*}
 */
GoogleCloudStorage.prototype.deleteObject = function (options) {
  var bucket = this._getProject().storage().bucket(options.bucket);
  var file = bucket.file(options.key);

  return new Promise(function (resolve, reject) {
    file.delete(function (error) {
      return error ? reject(error) : resolve();
    });
  });
};

/**
 * Get Google project
 * @returns {*}
 * @private
 */
GoogleCloudStorage.prototype._getProject = function () {
  return this._project;
};

/**
 * Set Google project
 * @param project
 * @returns {GoogleCloudStorage}
 * @private
 */
GoogleCloudStorage.prototype._setProject = function (project) {
  this._project = project;
  return this;
};

/**
 * Update project credentials
 * @returns {GoogleCloudStorage}
 * @private
 */
GoogleCloudStorage.prototype._updateProjectCredentials = function () {
  this._setProject(gcloud({
    keyFilename: this._getKeyFilename(),
    projectId: this._getProjectId()
  }));

  return this;
};

/**
 * Get Google project id
 * @returns {*}
 * @private
 */
GoogleCloudStorage.prototype._getProjectId = function () {
  return this.projectId;
};

/**
 * Set Google project id
 * @param id
 * @returns {GoogleCloudStorage}
 * @private
 */
GoogleCloudStorage.prototype._setProjectId = function (id) {
  this.projectId = id;
  this._updateProjectCredentials();
  return this;
};

/**
 * Get key filename
 * @returns {*}
 * @private
 */
GoogleCloudStorage.prototype._getKeyFilename = function () {
  return this.keyFilename;
};

/**
 * Set key filename
 * @param key
 * @returns {GoogleCloudStorage}
 * @private
 */
GoogleCloudStorage.prototype._setKeyFilename = function (key) {
  this.keyFilename = key;
  this._updateProjectCredentials();
  return this;
};

module.exports = GoogleCloudStorage;
