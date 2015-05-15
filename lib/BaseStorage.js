var IMPLEMENT_MESSAGE = 'You should implement this method';

function BaseStorage() {
}

BaseStorage.prototype.upload = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

BaseStorage.prototype.get = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

BaseStorage.prototype.remove = function () {
  throw new Error(IMPLEMENT_MESSAGE);
};

module.exports = BaseStorage;
