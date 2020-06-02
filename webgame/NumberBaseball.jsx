import React, { useState } from 'react';
import Try from './Try';

// this를 쓰지 않는 함수는 class 밖으로 뺄 수 있다. 
const getNumbers = () => {
    const candidates = [1, 2 , 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i +=1){
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};  //숫자 4개를 겹치지않고 랜덤하게 뽑는 함수


const NumberBaseball = () => {

    const[result, setResult] = useState('시작합니다');
    const[value, setValue] = useState('');
    const[answer, setAnswer] = useState(getNumbers());
    const[tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){ // 정답을 맞춘 경우
            setResult('홈런');
            setTries((t) => ([
                ...t,
                {
                  try: value,
                  result: '홈런!',
                }
              ]));
            alert('게임을 다시시작합니다.');
            setValue('');
            setResult('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArray = value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9){ //10번 이상 틀렸을 때
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`);
                alert('게임을 다시시작합니다.');
                setValue('');
                setResult('');
                setAnswer(getNumbers());
                setTries([]);
            } else { // 볼, 스트라이크를 알려주는 알고리즘
                for(let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]){
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries(t => ([
                    ...t,
                    {
                      try: value,
                      result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                    }
                  ]));
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" maxLength={4} value={value} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map( (v, i) => {
                    return(
                    <Try key={`${i + 1}`} tryInfo={v}/> //컴포넌트화 : 코드 가독성, 성능최적화, 재사용성
                    );
                })}
            </ul>
        </>
    )    
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