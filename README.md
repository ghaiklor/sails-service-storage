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
      .upload('<PATH_TO_FILE_OR_STREAM>')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## Configuration

You can save any value what you want in your configuration object.

## API

Each of storage instances has following methods:

### upload()

Upload specified file to storage

### download()

Download specified file from storage

### delete()

Delete specified file from storage

## Examples

### AmazonS3Storage

```javascript
var amazon = StorageService.create('amazon-s3');

amazon
  .upload('<FILE>')
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
