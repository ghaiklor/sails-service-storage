import AmazonStorage from 'AmazonStorage';
import GCloudStorage from 'GCloudStorage';

export default class StorageFactory {
  static create(type, options) {
    switch (type) {
      case 'amazon':
        return StorageFactory.createAmazon(options);
      case 'gcloud':
        return StorageFactory.createGCloud(options);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  }

  static createAmazon(options) {
    return new AmazonStorage(options);
  }

  static createGCloud(options) {
    return new GCloudStorage(options);
  }
}
