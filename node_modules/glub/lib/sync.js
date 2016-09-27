var path = require('path');
var glob = require('glob');

module.exports = sync;

function sync(glubs, options) {
  options = options || {};
  options.ignore = options.ignore || [];
  var searches = [];
  glubs.forEach(function(glub) {
    if (glub[0] === '!') {
      options.ignore.push(glub.slice(1));
    } else {
      searches.push(glub);
    }
  });

  var ret = [];
  var seenFiles = {};

  searches.forEach(function(glub) {
    var files = glob.sync(glub, options);
    files.forEach(function(file) {
      var resolved = path.resolve(file);
      if (!seenFiles[resolved]) {
        ret.push(file);
        seenFiles[resolved] = true;
      }
    });
  });

  return ret;

}
