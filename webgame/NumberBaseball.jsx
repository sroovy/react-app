import React from 'react';
import { Component } from 'react';
import { useState, useRef } from 'react';
import Try from './Try';

// this를 쓰지 않는 함수는 class 밖으로 뺄 수 있다. 
function getNumbers () {
    const candidate = [1, 2 , 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i +=1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen)
    }
}  //숫자 4개를 겹치지않고 랜덤하게 뽑는 함수

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // e.g. [1, 3, 5, 7]
        tries: [], //push xx
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){ // 정답을 맞춘 경우
            this.setState({
                result: '홈런',
                tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }]
                // ...this.state.tries -> 기존 배열 { 배열 추가 요소 }
            });
            alert('게임을 다시시작합니다.');
                this.setState({ // 게임초기화
                    result: '',
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
        } else {
            const answerArray = this.state.value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9){ //10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join('')}였습니다.`
                });
                alert('게임을 다시시작합니다.');
                this.setState({ // 게임초기화
                    result: '',
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else { // 볼, 스트라이크를 알려주는 알고리즘
                for(let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, { try: this.state.value, result: `${strike}스트라이크, ${ball}입니다`}],
                    value: ''
                })
            }
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        })
    };



    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input type="number" maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력</button>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map( (v, i) => {
                        return(
                        <Try key={`${i + 1}`} tryInfo={v}/> //컴포넌트화 : 코드 가독성, 성능최적화, 재사용성
                        );
                    })}
                </ul>
            </>
        )
    }

}


export default NumberBaseball;


//es module system
// import React from 'react';
// export const hello = 'hello';
// export default GuGuDan;

// node module system
// const React = requir('react');
// exports.hello = 'hello';
// module.exports = GuGuDan;

//node에서 import를 쓰면 에러가 나는데
// babel이 require로 바꿔준다. 
// webpack은 node가 실행해주기때문에 const를 써야한다. 