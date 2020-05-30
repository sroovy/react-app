// 분할된 파일을 만들 때 필요로하는 패키지나 라이브러리를 가지고 온다. 
const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        text: 'hello, webpack'
    }
    
    render () {
        return <h1>{this.state.text}</h1>
    }
}

// 분할된 파일을 외부에서도 사용할 수 있게 해주는 코드
module.exports = WordRelay; 