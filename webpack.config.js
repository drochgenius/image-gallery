const path = require('path');

module.exports = [
    {
        entry: {
            'image-gallery': './src/components/image-gallery.ts',
            'image-gallery.spec': './src/unit/image-gallery.spec.ts'
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: ['source-map-loader', 'ts-loader'],
                    exclude: /node_modules/
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
            path: path.resolve(__dirname, 'dist/dev')
        },
        devtool: 'eval'
    },
    {
        entry: {
            'image-gallery': './src/components/image-gallery.ts'
        },
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/
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
        }
    }
];
