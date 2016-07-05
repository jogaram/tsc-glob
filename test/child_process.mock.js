var expect = require('chai').expect;

var Process = function () {
    var listeners = {};

    this.on = function (event, cb) {
        listeners[event] = cb;
    };
};

module.exports = {
    spawn: function (cmd, args) {
        expect(cmd).to.equal('node_modules/.bin/tsc');
        expect(args).to.eql(['src/User.ts']);
        return new Process();
    }
};