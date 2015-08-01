# sails-service-storage

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-storage.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-storage.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-storage.svg) ![npm version](https://img.shields.io/npm/v/sails-service-storage.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-storage.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-storage.svg) ![License](https://img.shields.io/npm/l/sails-service-storage.svg)

Service for Sails framework with storage features.

## List of supported storage

- Amazon S3

## Getting Started

Install this module.

```shell
npm install sails-service-storage
```

Then require it in your service.

```javascript
// api/services/StorageService.js
module.exports = require('sails-service-storage');
```

That's it, you can create storage instances for your needs in your project.

```javascript
// api/controllers/StorageController.js
var amazon = StorageService.create('amazon');

module.exports = {
  upload: function(req, res) {
    amazon
      .upload('<SOURCE>', '<BUCKET>:<KEY>')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## Configuration

Configuration object has few properties to use:

`config.provider` - Configure storage provider (specific for each of services, take a look at examples for more info)

## API

Each of storage instances has following methods:

### upload(source, destination, [config])

Upload specified file to storage.

`source` - {String|Buffer|Stream} Source file that need to upload to storage

`destination` - {String} Destination where file should be uploaded (Bucket:Key, local path, etc...)

`config` - {Object} Specific config for each of provider. This config will be passed directly into each of providers.

Return Promise.

### download(source)

Download specified file from storage.

`source` - {String} Which file you want to download from storage.

Return Promise.

### remove(source)

Remove specified file from storage.

`source` - {String} Which file you want to remove from storage.

Return Promise.

## Examples

### AmazonStorage

```javascript
var amazon = StorageService.create('amazon');

amazon
  .upload('<FILE>', '<BUCKET:KEY>')
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
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
