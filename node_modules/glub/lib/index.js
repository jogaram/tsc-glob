var path = require('path');
var glob = require('glob');

module.exports = glub;
glub.sync = require('./sync');

function glub(glubs, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }
  options.ignore = options.ignore || [];
  var searches = [];
  glubs.forEach(function(glub) {
    if (glub[0] === '!') {
      options.ignore.push(glub.slice(1));
    } else {
      searches.push(glub);
    }
  });

  var ticks = searches.length;

  var ret = [];
  var seenFiles = {};
  var errs = [];

  searches.forEach(function(glub) {
    glob(glub, options, function(err, files) {
      if (err) {
        return errs.push(err);
      }
      files.forEach(function(file) {
        var resolved = path.resolve(file);
        if (!seenFiles[resolved]) {
          ret.push(file);
          seenFiles[resolved] = true;
        }
      });
      if (--ticks === 0) {
        callback(errs.length ? errs : null, ret);
      }
    });
  });

}
