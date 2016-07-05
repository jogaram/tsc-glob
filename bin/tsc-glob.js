#! /usr/bin/env node

var spawn = require('child_process').spawn,
    helper = require('./command-helper'),
    options = helper.getOptions(),
    commandArgs = options.unknown.concat(helper.resolveTSFiles()),
    proc = spawn(helper.findTSCExecutable(), commandArgs, { stdio: 'inherit' });

proc.on('exit', function (code, signal) {
    process.on('exit', function(){
        if (signal) {
            process.kill(process.pid, signal);
        } else {
            process.exit(code);
        }
    });
});

// terminate children.
process.on('SIGINT', function () {
    proc.kill('SIGINT'); // calls runner.abort()
    proc.kill('SIGTERM'); // if that didn't work, we're probably in an infinite loop, so make it die.
});

module.exports = process;