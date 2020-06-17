import React, { Component } from 'react';

// 랜덤한 숫자를 받아오는 함수
const getNumber = () => {
    return Math.ceil(Math.random() * 9);
}

class GuGuDan extends Component {
    state = {
        first : getNumber(),
        second : getNumber(),
        value: '',
        result: '???'
    }

    //input의 입력값을 받아오는 함수
    onChangeValue = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    // input의 입력값을 제출하는 함수
    onSubmitValue = (e) => {
        e.preventDefault();
        if(parseInt(this.state.value) === this.state.first * this.state.second){ 
            this.setState((prevState) => {
                return {
                result: prevState.value + ' 정답입니다!',
                value: '',
                first : getNumber(),
                second : getNumber()
                };
            });
            this.input.focus();
        } else {
            this.setState({
                result: '땡!',
                value: '',
            });
            this.input.focus();
        }
    };

    //input 선언
    input;
    // focus 함수
    onRefInput = (c) => {this.input = c; }

    render () {
        return (
            // 최상위 태그가 반드시 존재해야 한다. <React.Fragment>, <>
            <div id="gugudan">
                <div className="questions">{this.state.first} &times; {this.state.second} 은?</div>
                <form onSubmit={this.onSubmitValue}>
                    <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChangeValue} />
                    <button type="submit">check</button>
                </form>
                <div className="result">{this.state.result}</div>
            </div>
        ) 
    }
}

export default GuGuDan;