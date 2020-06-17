import React, { Component, createRef } from 'react';
import Try from './TryClass';


// 숫자 4개를 랜덤하게 뽑는 함수(중복 X)
const getNumbers = () => { 
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
    const numbers = []; 
    for(let i = 0; i < 4; i++){
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // 배열을 반환하기 때문에
        numbers.push(chosen);
    }
    return numbers;
};
class NumberBaseball extends Component {
    state = {
        result: '⚾️Number Baseball⚾️',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    onSubmitForm = (e) => {
        const { value, tries, answer } = this.state;
        e.preventDefault();
        if(value === answer.join('')){ // 정답일 때,
            // 입력값은 2132 answer는 [3,5,6,7] -> 3678
            this.setState((prevState) => {
                return {
                    result: "홈런!",
                    value: '',
                    tries: [...prevState.tries, { try : value, result: '홈런!'}]
                }
            });
        } else { // 정답이 아닐때
            const answerArray =  value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){ // 10번 이상 틀렸을 때 
                this.setState({
                    result: `10번 이상 틀려서 실패! 답은 ${answer.join('')}입니다.`,
                });
                this.inputRef.current.focus();
            } else {
                for(let i = 0; i < 4; i++){
                    if(answerArray[i] === answer[i]){ // strike 같은 자리인지 확인
                        strike += 1;
                    } else if (answer.indexOf(answerArray[i]) > -1){ // ball 숫자가 있는지 확인
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { id: tries.length, try: value, result: `${strike}스트라이크 ${ball}볼 입니다` }],
                        value: ''
                    }
                })
                this.inputRef.current.focus();
            }
        }
    }

    onChangeValue = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    onClickReset = () => {
        this.setState({
            result: '⚾️Number Baseball⚾️',
            value: '',
            answer: getNumbers(),
            tries: []
        });
    }

    inputRef = createRef(); // this.inputRef

    render() {
        const { result, value, tries } = this.state;
        return (
            <div id="NumberBaseball">
                <div className="result">{result}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} value={value} onChange={this.onChangeValue} maxLength="4" />
                    <button type="submit">입력</button>
                </form>
                <div className="tries">{tries.length}번째 시도</div>
                <ul>
                    {tries.map((v) => {
                        return (
                            <Try key={`${v.id}시도`} tryInfo={v}/>
                        );
                    })}
                </ul>
                {tries.length >= 1 ? <button className="reset" onClick={this.onClickReset}>reset</button> : null}
            </div>
        )
    }
}

export default NumberBaseball;