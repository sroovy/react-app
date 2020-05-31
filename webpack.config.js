const path = require('path');
// node.js에서 경로를 조작하기 위해 제공
const webpack = require('webpack');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스 -> production
    devtool: 'eval', // 빠르게
    resolve: {
        extensions: ['.js', '.jsx']
        //webpack 자동으로 확장자를 확인해준다. -> entry
    },
    
    // ***중요
    // entry의 파일을 읽고, module을 적용한 후, output. 
    entry: {
        app: './client' //client.jsx에서 이미 WordRelay.jsx(+react, react DOM)를 불러오고 있기 때문에 생략 가능
        
    }, // 입력

    module: {
        rules: [
            {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
            ] //presets : plugin들의 모임
            }
        }]
    },
    //plugins: [
    //    new webpack.LoaderOptionsPlugin({ debug: true })
    //], //확장 프로그램
    output: {
        path: path.join(__dirname, 'dist'), //현재폴더/dist로 자동으로 설정해준다.
        filename: 'app.js'
    } //출력
}