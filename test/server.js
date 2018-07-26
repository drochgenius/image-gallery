const bs = require('browser-sync');

bs({
    server: {
        baseDir: ['.'],
        index: 'test/runner.html'
    },
    files: [
        'dist/**/*.js'
    ]
});
