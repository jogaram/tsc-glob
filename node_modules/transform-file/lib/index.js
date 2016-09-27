var fs = require('fs');
var getTmpFile = require('./get-tmp-file');

module.exports = transformFile;

function transformFile(fileLocation, transformerFunction, doneCallback) {
  fs.exists(fileLocation, function(exists) {
    if (!exists) {
      return doneCallback(new Error("File doesn't exist"));
    }
    getTmpFile(function(err, tmpFileLocation) {
      if (err) {
        return doneCallback(err);
      }
      var isTransformAsync = transformerFunction.length > 2;
      var reader = fs.createReadStream(fileLocation);
      var writer = fs.createWriteStream(tmpFileLocation, { mode: 0600 });
      var lastReceivedChunk;
      reader.on('data', function(buffer) {
        handleChunk(buffer, false);
      });
      reader.on('close', function() {
        handleChunk(null, true);
      });



      function handleChunk(buffer, isFinalChunk) {
        debugger;
        if (lastReceivedChunk) {
          var wasSuccessfulWriting;

          var callback = isFinalChunk ? handleClose : reader.resume.bind(reader)



          if (isTransformAsync) {
            reader.pause();
            transformerFunction(lastReceivedChunk, isFinalChunk, function(transformed) {
              wasSuccessfulWriting = writer.write(  transformed  );
              if (wasSuccessfulWriting) {
                callback();
              } else {
                writer.once('drain', callback);
              }
            });
          } else {
            wasSuccessfulWriting = writer.write(  transformerFunction(lastReceivedChunk, isFinalChunk)  );
            if (!wasSuccessfulWriting) {
              reader.pause();
              writer.once('drain', callback);
            } else if (isFinalChunk) {
              callback();
            }
          }




        }
        lastReceivedChunk = buffer;
      }


      function handleClose() {
        writer.end(function() {
          var newWriter = fs.createWriteStream(fileLocation);
          newWriter.on('finish', function() {
            fs.unlink(tmpFileLocation, function() {
              doneCallback();
            })
          });
          fs.createReadStream(tmpFileLocation).pipe(newWriter);
        });

      }
    });




  });
}
