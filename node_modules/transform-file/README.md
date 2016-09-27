transform file
===

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Transform a file as a stream in place (with a temp file, but retaining inode info)

#### Usage

Take a look at the test folder for more usages, but the basic idea is you pass in a file,
a transform callback and a done callback and it calls the transform callback on each chunk
passing in a buffer and a boolean that's true if it's the last chunk in the file, the callback
can be async or sync, by either accepting a third arg or not. Here's an example:

```js
var transformFile = require('transform-file');

transformFile(
  __dirname + '/package.json',
  function(buffer, isLastChunk) {
    return buffer.toString().toUpperCase() + (isLastChunk ? '\n\n\n' : '');
  },
  function() {
    fs.readFile(__dirname + '/package.json', function(err, buffer) {
      console.log(buffer.toString()); // uppercase with trailing newlines
    });
  }
);

// same as above just async
transformFile(
  __dirname + '/package.json',
  function(buffer, isLastChunk, next) {
    setTimeout(function() {
      // notice we use next() and not return
      next(buffer.toString().toUpperCase() + (isLastChunk ? '\n\n\n' : ''));
    }, 10);
  },
  function() {
    fs.readFile(__dirname + '/package.json', function(err, buffer) {
      console.log(buffer.toString()); // uppercase with trailing newlines
    });
  }
);


```


[npm-image]: https://img.shields.io/npm/v/transform-file.svg?style=flat-square
[npm-url]: https://npmjs.org/package/transform-file
[travis-image]: https://img.shields.io/travis/kolodny/transform-file.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/transform-file
[coveralls-image]: https://img.shields.io/coveralls/kolodny/transform-file.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/kolodny/transform-file
[downloads-image]: http://img.shields.io/npm/dm/transform-file.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/transform-file
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/kolodny/transform-file?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
