const React = require('react');
const { Component } = React;
const { useState, useRef } = React;

const GuGuDan = () => {
    // state 선언 방법, 우항에 초기값을 넣어준다. 
    // 함수내에 선언해준다. 
    const[first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const[second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const[value, setValue] = useState('');
    const[result, setResult] = useState('');
    const inputRef = useRef();

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second){
            // setState를 한번에 처리해준다. -> 비동기
            setFirst((Math.ceil(Math.random() * 9)));
            setSecond((Math.ceil(Math.random() * 9)));
            setValue('');
            setResult((prevResult) => {
                // console.log("prevResult",prevResult);
                // console.log("value",value);
                return "정답 : " + value
            });
            // value는 현재 state의 value값이다. 
            inputRef.current.focus();
        } else {
            setValue('');
            setResult("정답이 아닙니다.");
            inputRef.current.focus();
        }
    }
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    // class -> className / for -> htmlFor
    return (
        <>
            <div id="question"> {first} 곱하기 {second} 는? </div>
            <form onSubmit = {onSubmitForm}>
                <input type="text" placeholder="정답을 입력해주세요." ref={inputRef} onChange = {onChangeInput} value={value}></input>
                <button>입력!</button>    
            </form>
            <div id="result">{result}</div>
        </>
    );
}


module.exports = GuGuDan;