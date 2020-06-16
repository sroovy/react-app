import React, { useState } from 'react';
import Try from './TryHooks';

const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8 ,9];
    const numbers = []
    for(let i = 0; i < 4; i++){
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        numbers.push(chosen);
    }
    return numbers
}

const NumberBaseball = () => {
    const [result, setResult] = useState('⚾️Number Baseball⚾️');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){   // 정답일 때
            setResult('홈런!');
            setValue('');
            setAnswer(getNumbers());
            setTries([...tries, {try : value, result: '홈런'}]);
        } else {  // 정답이 아닐때
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){
                setResult(`10번 이상 틀려서 실패! 답은 ${answer.join('')}입니다.`);

            } else {
                for(let i = 0; i < 4; i++){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    } else if (answer.indexOf(answerArray[i]) > -1){
                        ball += 1;
                    }
                }
                setTries( [...tries, { id: tries.length, try: value, result: `${strike}스트라이크 ${ball}볼 입니다` }]);
                setValue('');
            }
        }
    };



    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    const onClickReset = (e) => {
        e.preventDefault();
        setResult('⚾️Number Baseball⚾️');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
    };


    return (
        <div id="NumberBaseball">
            <div className="result">{result}</div>
            <form onSubmit={onSubmitForm}>
                <input value={value} onChange={onChangeInput} maxLength="4" />
                <button type="submit">입력</button>
            </form>
            <div className="tires">{tries.length}번째 시도</div>
            <ul>
                {tries.map((v) => {
                    return (
                        <Try key={`${v.id}시도`} tryInfo={v}/>
                    )
                })}
            </ul>
            {tries.length >= 1 ? <button className="reset" onClick={onClickReset}>reset</button> : null}
        </div>
    )


}

export default NumberBaseball;