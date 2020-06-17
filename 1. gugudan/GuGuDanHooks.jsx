import React, { useState } from 'react';

// 랜덤한 숫자를 받아오는 함수
const getNumber = () => {
   return Math.ceil(Math.random() * 9);
}

const GuGuDan = () => {
   const [first, setFirst] = useState(getNumber());
   const [second, setSecond] = useState(getNumber());
   const [value, setValue] = useState('');
   const [result, setResult] = useState('???');
   const inputRef = React.useRef(null);

   const onChangeValue = (e) => {
      setValue(e.target.value);
   }

   const onSubmitForm = (e) => {
      e.preventDefault();
      if(parseInt(value) === first * second){ 
         setFirst(getNumber());
         setSecond(getNumber());
         setResult((prevResult) => value + ' 정답입니다');
         setValue('');
         // setState를 한번에 모아서 비동기로 처리 -> 렌더가 한번만 일어난다
         inputRef.current.focus();
      } else {
         setResult('정답이 아닙니다');
         setValue('');
         inputRef.current.focus();
      }
   };

   return (
   <div id="gugudan">
      <div className="questions">{first} &times; {second} 은?</div>
      <form onSubmit={onSubmitForm}>
         <input  ref={ inputRef } type="number" value={value} onChange={onChangeValue} />
         <button type="submit">check</button>
      </form>
      <div className="result">{result}</div>
   </div>
   )
}

export default GuGuDan;