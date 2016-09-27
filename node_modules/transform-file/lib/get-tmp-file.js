var fs = require('fs');
var path = require('path')
var crypto = require('crypto');
var tmpdir = require('os-tmpdir');

module.exports = getTmpFile;

function getTmpFile(callback) {
  var fileLocation = path.join(tmpdir(), crypto.randomBytes(5).toString('hex'));

  fs.exists(fileLocation, function(exists) {
    if (exists) {
      getTmpFile(callback);
    } else {
      callback(null, fileLocation);
    }
  });
}
