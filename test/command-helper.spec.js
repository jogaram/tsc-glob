var expect = require('chai').expect,
    fs = require('fs'),
    path = require('path');


describe('command-helper', function () {
    var helper;

    beforeEach(function () {
        process.argv = [];
        process.chdir(path.join(__dirname, '..'));
        helper = require('../bin/command-helper');
    });

    describe('.findTSCExecutable()', function () {
        it('should find tsc in typescript/bin dir', function () {
            process.chdir(path.join(__dirname, 'tsc_package'));
            expect(helper.findTSCExecutable()).to.eq('node_modules/typescript/bin/tsc')
        });
        it('should find tsc in .bin dir', function () {
            process.chdir(path.join(__dirname, 'tsc_bin'));
            expect(helper.findTSCExecutable()).to.eq('node_modules/.bin/tsc')
        });
        it('should find tsc in typescript/bin dir', function () {
            process.chdir(path.join(__dirname, 'tsc_multiple'));
            expect(helper.findTSCExecutable()).to.eq('node_modules/.bin/tsc')
        });
        it('should throw error if no tsc found', function () {
            process.chdir(path.join(__dirname, 'empty'));
            expect(helper.findTSCExecutable).throws('ERROR: Missing Typescript compiler executable [tsc].')
        });
    });

    describe('.resolveTSFiles()', function () {
        beforeEach(function () {
            process.chdir(path.join(__dirname, 'tsconfig_file'));
        });

        it('should resolve files from tsconfig.json', function () {
            expect(helper.resolveTSFiles()).to.eql(['src/User.ts'])
        });
        it('should resolve files from alternative tsconfig.json', function () {
            process.argv = ['--tsconfig-file', 'conf/tsconfig.json'];
            expect(helper.resolveTSFiles()).to.eql(['src/User.ts'])
        });
        it('should resolve files from command line', function () {
            process.argv = ['--files-glob', '**/*.spec.ts'];
            expect(helper.resolveTSFiles()).to.eql(['src/User.spec.ts'])
        });
        it('should throw error if no "filesGlob" property in tsconfig.json', function () {
            process.chdir(path.join(__dirname, 'invalid_tsconfig'));
            expect(helper.resolveTSFiles).throws('ERROR: Property "filesGlob" not found in tsconfig.json')
        });
        it('should throw error if tsconfig.json is not accesible', function () {
            process.chdir(path.join(__dirname, 'empty'));
            expect(helper.resolveTSFiles).throws('ERROR: tsconfig.json file is not accessible.')
        });
    });

    describe('.getOptions()', function () {
        describe('.unknown', function () {
            it('should contain ["--outDir", "dist"]', function () {
                process.argv = ['--outDir', 'dist']
                expect(helper.getOptions().unknown).to.eql(['--outDir', 'dist']);
            })
        })
    });
});