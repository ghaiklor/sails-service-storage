# sails-service-storage

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-storage.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-storage.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-storage.svg) ![npm version](https://img.shields.io/npm/v/sails-service-storage.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-storage.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-storage.svg) ![License](https://img.shields.io/npm/l/sails-service-storage.svg)

Service for Sails framework with Storage features.

> Stability: 1 - Experimental.
> This module was introduced recently, and may change or be removed in future versions.
> Please try it out and provide feedback.
> If it addresses a use-case that is important to you, tell the core developer.

## Draft (how services should be done)

Each service should export Factory class that can be instantiated from developer-side.
Also service should export already instantiated Factory class with empty params.

So, when you are developing module, your index file should be smth like this:

```javascript
var StorageFactory = require('./lib/StorageFactory');

module.exports = new StorageFactory();
module.exports.Factory = StorageFactory;
```

And now let's take a look how it can be used from developer-side.

**Simple Usage**

We are using already instantiated Factory instance with no parameters.

```javascript
// api/services/StorageService.js
module.exports = require('sails-service-storage');

// StorageController.js
module.exports = {
  upload: function(req, res) {
    StorageService
      .create('amazon', {some: 'options'})
      .upload('some-file.png')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

Or you can create storage service in services and pre-define which storage service is using:

```javascript
// api/services/StorageService.js
module.exports = require('sails-service-storage').create('amazon', {some: 'options'});

// StorageController.js
module.exports = {
  upload: function(req, req) {
    StorageService
      .upload('some-file.png')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

Or, if you want to choose different services till developing:

```javascript
// api/services/StorageService.js
module.exports = require('sails-service-storage');

// StorageController.js
var AmazonStorage = StorageService.create('amazon', {some: 'options'});
var GoogleStorage = StorageService.create('gcloud', {some: 'options'});

module.exports = {
  amazon: function(req, res) {
    AmazonStorage
      .upload('some-file.png')
      .then(res.ok)
      .catch(res.serverError);
  },
  
  google: function(req, res) {
    GoogleStorage
      .upload('some-file.png')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

**More Advanced Usage**

You can require Factory class and create new instance of Factory where you can set predefined options like:

```javascript
// api/services/StorageFactory.js
module.exports = require('sails-service-storage').Factory;

// SomeController.js
var AmazonFactory = new StorageFactory({
  type: 'amazon',
  accessKeyId: '1234',
  secretKey: '1234'
});

var AmazonStorage = AmazonFactory.create();

module.exports = {
  upload: function(req, res) {
    AmazonStorage
      .upload('some-file.png')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## Getting Started

Install module as dependency:

```shell
npm install --save sails-service-storage
```

Require installed module to your service:

```javascript
// api/services/StorageService.js
module.exports = require('sails-service-storage');
```

Upload some file, i.e. to Amazon:

```javascript
// api/controllers/SomeController.js
module.exports = {
  index: function(req, res) {
    StorageService
      .create('amazon')
      .upload('my-file-name.png')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## Advanced Usage

When you requiring module, actually you'll get created Factory instance and pointer to Factory class for your advanced usage.

```javascript
var Storage = require('sails-service-storage');
var StorageFactory = require('sails-service-storage').Factory;
// or
var StorageFactory = Storage.Factory;
```

Then you can use as already created Factory instance either create your own:

```javascript
var Storage = require('sails-service-storage');
var StorageFactory = require('sails-service-storage').Factory;

// Create instance for uploading to Amazon
var AmazonUploader = Storage.create('amazon');

// Or create your own Factory
var MyOwnFactory = new StorageFactory();
var AmazonUploaderFromMyFactory = MyOwnFactory.create('amazon');
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
