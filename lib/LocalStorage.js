var util = require('util');
var BaseStorage = require('./BaseStorage');

util.inherits(LocalStorage, BaseStorage);

function LocalStorage() {

}

module.exports = LocalStorage;
