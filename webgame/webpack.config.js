const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: "webgame",
    mode: "development",
    devtool: 'eval',
    resolve : {
        extensions : ['.js', '.jsx']
    },
    entry: {
        app: './client',
    },
    module : {
        rules: [{
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env',{
                        targets: {
                            browsers: ['> 5% in KR'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ]
            }
        }]
    },
    plugins: [],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }

};