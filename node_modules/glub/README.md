glub
===

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Small wrapper around [`glob`](https://github.com/isaacs/node-glob) to allow mutiple args, useful for consuming mutiple command line args

```js
var glub = require('glub');

// process.argv === ['node', 'index', '**/*.js', '!node_modules/**/*.js']
var files = glub.sync(process.argv.slice(2));

glub(process.argv.slice(2), function(err, files) {

});
```

It takes an optional second `options` param which just forwards to `glob` (the `ignore` prop gets pushed values)


[npm-image]: https://img.shields.io/npm/v/glub.svg?style=flat-square
[npm-url]: https://npmjs.org/package/glub
[travis-image]: https://img.shields.io/travis/kolodny/glub.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/glub
[coveralls-image]: https://img.shields.io/coveralls/kolodny/glub.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/kolodny/glub
[downloads-image]: http://img.shields.io/npm/dm/glub.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/glub
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/kolodny/glub?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
