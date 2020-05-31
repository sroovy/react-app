const React = require('react');
const { useState } = require('react');

const WordRelay = () => {
  const [word, setWord] = useState('수연');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = React.useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputEl.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputEl.current.focus();
    }
  };

  return (
    <>
        <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label id="label" htmlFor="wordInput">입력하세요</label>
                <input id="wordInput" className="wordInput"
                ref={inputEl}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                />
                <button>입력!</button>
            </form>
        <div>{result}</div>
    </>
  );
};
module.exports = WordRelay;