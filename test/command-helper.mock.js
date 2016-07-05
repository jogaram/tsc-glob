module.exports={
    getOptions: function () {
        return {unknown: []}
    },
    resolveTSFiles: function () {
        return ['src/User.ts']
    },
    findTSCExecutable: function () {
        return 'node_modules/.bin/tsc'
    }
};