#!/usr/bin/env node

const spawn = require('child_process').spawn,
    glob = require("glob"),
    helper = require('./command-helper');

var options = helper.getOptions(),
    commandArgs = options.unknown.concat(helper.resolveTSFiles());

var proc = spawn('node', ['node_modules/typescript/lib/tsc.js'].concat(commandArgs), { stdio: 'inherit' });
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
