var transformFile = require('..');
var assert = require('assert');
var fs = require('fs');

var fileLocation = __dirname + '/file.txt';

describe('when given smaller files', function() {
  var contents = 'this\nis\na\ntest\n';
  beforeEach(function(done) {
    fs.writeFile(fileLocation, contents, done);
  });
  afterEach(function(done) {
    fs.unlink(fileLocation, done);
  });

  it('transforms a file using a sync callback', function(done) {
    transformFile(
      fileLocation,
      function(buffer) {
        return buffer.toString().toUpperCase();
      },
      function() {
        fs.readFile(fileLocation, function(err, buffer) {
          assert.equal(buffer.toString(), contents.toUpperCase());
          done();
        });
      }
    );
  });

  it('transforms a file using an async callback', function(done) {
    transformFile(
      fileLocation,
      function(buffer, isLastChunk, callback) {
        setTimeout(function() {
          callback(buffer.toString().toUpperCase());
        }, 5);
      },
      function() {
        fs.readFile(fileLocation, function(err, buffer) {
          assert.equal(buffer.toString(), contents.toUpperCase());
          done();
        });
      }
    );
  });

});

describe('when given large files', function() {
  var contents = 'this\nis\na\ntest\n';
  contents = Array(100000).join(contents);
  beforeEach(function(done) {
    fs.writeFile(fileLocation, contents, done);
  });
  afterEach(function(done) {
    fs.unlink(fileLocation, done);
  });

  it('transforms a file using a sync callback', function(done) {
    transformFile(
      fileLocation,
      function(buffer) {
        return buffer.toString().toUpperCase();
      },
      function() {
        fs.readFile(fileLocation, function(err, buffer) {
          assert.equal(buffer.toString(), contents.toUpperCase());
          done();
        });
      }
    );
  });

  it('transforms a file using an async callback', function(done) {
    transformFile(
      fileLocation,
      function(buffer, isLastChunk, callback) {
        setTimeout(function() {
          callback(buffer.toString().toUpperCase());
        }, 5);
      },
      function() {
        fs.readFile(fileLocation, function(err, buffer) {
          assert.equal(buffer.toString(), contents.toUpperCase());
          done();
        });
      }
    );
  });

});
