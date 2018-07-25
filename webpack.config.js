const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'image-gallery': './src/components/image-gallery.ts',
        'image-gallery.spec': './src/unit/image-gallery.spec.ts'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: ['source-map-loader','ts-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/build')
    },
    devtool: 'inline-source-maps'
};
