const bs = require('browser-sync').create();
const { execSync } = require('child_process');

// Listen to change events on HTML and reload
bs.watch('dist/dev').on('change', () => {
    execSync('npm run instrument');
    bs.reload();
});

bs.init({
    server: {
        baseDir: ['.'],
        index: 'test/runner.html'
    }
});
