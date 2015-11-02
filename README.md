# sails-service-storage

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-storage.svg)
![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-storage.svg)

![Downloads](https://img.shields.io/npm/dm/sails-service-storage.svg)
![Downloads](https://img.shields.io/npm/dt/sails-service-storage.svg)
![npm version](https://img.shields.io/npm/v/sails-service-storage.svg)
![License](https://img.shields.io/npm/l/sails-service-storage.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![dependencies](https://img.shields.io/david/ghaiklor/sails-service-storage.svg)
![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-storage.svg)

Service for Sails framework with storage features.

## List of supported storage

- Amazon S3
- Local Storage

## Getting Started

Install this module.

```shell
npm install sails-service-storage
```

Then require it in your service and create storage instance.

```javascript
// api/services/StorageService.js
import StorageService from 'sails-service-storage';

export default StorageService('amazon', {
  provider: {
    accessKeyId: '',
    secretAccessKey: ''
  },
});

// api/controllers/StorageController.js
module.exports = {
  upload: function(req, res) {
    StorageService
      .upload('<SOURCE>', '<BUCKET>:<KEY>')
      .then(res.ok)
      .catch(res.negotiate);
  }
};
```

## Configuration

When you instantiate storage service `StorageService(type, config)` you can pass `provider` object.
And all other free space you can use for your needs.

`config.provider` - {Object} Configuration object for storage provider

## API

Each of storage instances has following methods:

### upload(source, destination, [config])

Upload specified file to storage. Returns Promise.

`source` - {String|Buffer} Source file that need to upload to storage;

`destination` - {String} Destination where file should be uploaded (Bucket:Key, local path, etc...)

`config` - {Object} Specific config for each of provider. This config will be passed directly into each of providers.

### download(source, [config])

Download specified file from storage. Returns Promise.

`source` - {String} Which file you want to download from storage.

`config` - {Object} Additional configuration object for specific SDK.

### remove(source, [config])

Remove specified file from storage. Returns Promise.

`source` - {String} Which file you want to remove from storage.

`config` - {Object} Additional configuration object for specific SDK.

## Examples

### AmazonStorage (upload)

```javascript
import fs from 'fs';

let amazon = StorageService('amazon', {
  provider: {
    accessKeyId: '<AMAZON_ACCESS_KEY_ID>',
    secretAccessKey: '<AMAZON_SECRET_ACCESS_KEY>'
  }
});

amazon
  .upload(fs.readFileSync('<FILE>'), 'MY_BUCKET:KEY')
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
```

### AmazonStorage (download)

```javascript
let amazon = StorageService('amazon', {
  provider: {
    accessKeyId: '<AMAZON_ACCESS_KEY_ID>',
    secretAccessKey: '<AMAZON_SECRET_ACCESS_KEY>'
  }
});

amazon
  .download('MY_BUCKET:KEY')
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
```

### AmazonStorage (remove)

```javascript
let amazon = StorageService('amazon', {
  provider: {
    accessKeyId: '<AMAZON_ACCESS_KEY_ID>',
    secretAccessKey: '<AMAZON_SECRET_ACCESS_KEY>'
  }
});

amazon
  .remove('MY_BUCKET:KEY')
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
```

### LocalStorage

```javascript
import path from 'path';

let local = StorageService('local', {
  provider: {
    uploads: path.resolve(__dirname, '../uploads')
  }
});

local
  .upload('./my-file.png', 'destination-file-name.png')
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
```

## License

The MIT License (MIT)

Copyright (c) 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
