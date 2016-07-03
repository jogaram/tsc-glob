#!/usr/bin/env node

const glob = require('glob'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk');

/**
 * Throw error and stop process.
 */
function error() {
    var args = Array.prototype.slice.call(arguments);
    throw ['ERROR:', args.join(' ')].join(' ')
}

/**
 * Resolve file globs based in command line or tsconfig.json file.
 * @returns {Array}
 */
function resolveGlobs() {
    var options = Helper.getOptions(),
        tsConfigFile,
        tsConfig;

    if (options['filesGlob'] && options['filesGlob'].length) {
        return options['filesGlob'];
    } else {
        tsConfigFile = path.join(process.cwd(), options['tsconfigFile']);
        try {
            fs.accessSync(tsConfigFile, fs.R_OK);
            tsConfig = require(tsConfigFile);

            if (!tsConfig['filesGlob'] || !(tsConfig['filesGlob'] instanceof Array)) {
                error('Property "filesGlob" not found in tsconfig.json');
            }

            return tsConfig['filesGlob'];
        } catch (err) {
            error('tsconfig.json file is not accessible.', err);
        }
    }
}

var Helper = {};

/**
 * Find tsc file executable path
 *
 * @returns {string}
 */
Helper.findTSCExecutable = function () {
    var command = '';

    glob.sync('**/@(.bin|bin)/tsc', {dot: true}).forEach(function (path) {
        if ((path.match(/\/bin\/tsc/) && !command) || path.match(/\/\.bin\/tsc/)) {
            command = path;
        }
    });

    if (!command) {
        error('Missing Typescript compiler executable [tsc].');
    }

    return command;
};

/**
 * Resolve ts file paths
 *
 * @returns {Array}
 */
Helper.resolveTSFiles = function () {
    var files = [];

    resolveGlobs().forEach(function (pattern) {
        glob.sync(pattern).forEach(function (file) {
            files.push(file);
        });
    });

    return files
};

/**
 * Get command options
 * @returns {Command}
 */
Helper.getOptions = function () {
    var commander = require('commander')
        .command('tsc-glob')
        .version(require('../package.json').version)
        .usage('[options]')
        .allowUnknownOption(true)
        .option('-f, --tsconfig-file <path>', 'tsconfig.json file location. Default ./tsconfig.json', 'tsconfig.json')
        .option('-g, --files-glob <globs>', 'File globs', function (val) {
            return val.split(',');
        }, []).parse(process.argv);

    commander.unknown = commander.parseOptions(process.argv).unknown;

    return commander;
};

module.exports = Helper;