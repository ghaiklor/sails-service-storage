# Changelog

## 3.0.2

- Update `aws-sdk` to the latest version;

## 3.0.1

- Typo fixes in documentation;

## 3.0.0

- Migration from ES5 to ES6 syntax;
- Remove `create()` method from StorageService. StorageService is a function now that you can call `StorageService('amazon')`;
- Fix issue with LocalStorage that didn't accessible via StorageService;
- Rename `provider.uploadsDir` to `provider.uploads` in configuration object for LocalStorage;

## 2.1.1

- Update dependencies;

## 2.1.0

- Implement LocalStorage;

## 2.0.0

- Implement AmazonStorage;
- Improve test coverage;
- Update docs;

## 0.1.0

- Initial release;
