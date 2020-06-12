const React = require('react');
const { useState } = require('react');

const WordRelayHooks = () => {
   const [word, setWord] = useState('리액트');
   const [value, setValue] = useState('');
   const [result, setResult] = useState('');
   const inputRef = React.useRef(null);

   const onSubmitForm = (e) => {
      e.preventDefault();
      if(word[word.length - 1] === value[0]){
         setWord(value);
         setValue('');
         setResult('딩동댕');
         inputRef.current.focus();
      } else {
         setValue('');
         setResult('땡');
         inputRef.current.focus();
      }
   };

   onChangeValue = (e) => {
      setValue(e.target.value);
   };

   return (
   <div id="wordRelay">
      <div className="word">{word}</div>
      <form onSubmit={onSubmitForm}>
         <label htmlFor="wordInput"><em className="lastWord">'{word[word.length - 1]}'</em>로 끝나는 단어를 입력해주세요</label>
         <input id="wordInput" className="wordInput" type="text" ref={ inputRef } value={value} onChange={onChangeValue} />
         <button type="submit">입력</button>
      </form>
      <div className="result" style={result === "땡" ? {color: 'crimson'} : {color: 'seagreen'}}>{result}</div>
   </div>
   )
}

module.exports = WordRelayHooks;