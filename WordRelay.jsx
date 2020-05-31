// 분할된 파일을 만들 때 필요로하는 패키지나 라이브러리를 가지고 온다. 
const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: "수연",
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                word: this.state.value,
                value: '',
                result: '정답입니다',
            })
            this.input.focus();
        } else {
            this.setState({
                value: '',
                result: '땡!!'
            })
            this.input.focus();
        }
    }

    input;

    onRefInput = (c) => {
        this.input = c;
    }
    onChangeInput = (e) => {
        this.setState({
            value: e.currentTarget.value
        })
    }

 
    render () {
        return (
            <div id="word__relay">
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}></input>
                    {/* value 와 onChange는 set / defaultValue = {this.state.value} */}
                    <button>Click!</button>
                </form>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

// 분할된 파일을 외부에서도 사용할 수 있게 해주는 코드
module.exports = WordRelay; 