var path = require('path'),
    mock = require('mock-require');


describe("tsc-glob", function () {
    beforeEach(function () {
        mock('../bin/command-helper', './command-helper.mock');
        mock('child_process', './child_process.mock.js');
    });

    it("should execute tsc command with vars", function () {
        require('../bin/tsc-glob');
    });

    afterEach(function () {
        mock.stopAll();
    })
});
