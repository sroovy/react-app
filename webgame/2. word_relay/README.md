# 2. 끝말잇기 🔠

<br />
<img src="https://github.com/lee-suyeon/react-app/blob/master/webgame/img/wordrelay.JPG?raw=true" width="450px" alt="wordrelay"></img>
<br/>

## 1. 게임 순서
1. 시작 단어는 '리액트'
2. 트로 끝나는 단어를 입력한다. 
3. 답을 체크한다. 
4. **정답**을 입력했을 경우 : 정답 메세지와 함께 단어가 입력한 단어로 변경된다. 
5. **오답**을 입력했을 경우 : 오답 메세지와 함께 폼만 리셋된다. 

<br/>

***

<br/>

## 2. word-relay logic
* 시작 단어의 **마지막 글자**와 입력한 글자의 **첫번째 글자**가 같으면 정답

```javascript
word[word.length - 1] === value[0] 
```

<br/>

## 3. Class

* value 와 onChange는 set로 넣어줘야한다. 그게 아니면  defaultValue={this.state.value} 를 넣어준다. 
```javascript

class WordRelay extends Component {
   state = {
      word: '리액트',
      value: '',
      result: ''
   }

   onSubmitForm = (e) => {
      e.preventDefault();
      if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
         this.setState({
            word: this.state.value,
            value: '',
            result: '딩동댕'
         });
         this.input.focus();
      } else {
         this.setState({
            value: '',
            result: '땡'
         });
         this.input.focus();
      }
   }

   onChangeValue = (e) => {
      this.setState({
         value: e.target.value
      });
   };

   input;

   onRefInput = (c) => {
      this.input = c;
   }

   render () {
      return (
         <div id="wordRelay">
            <div className="word">{this.state.word}</div>
            <form onSubmit={this.onSubmitForm}>
               <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeValue} />
               <button type="submit">입력</button>
            </form>
            <div className="result" style={this.state.result === '땡' ? {color: 'crimson'} : {color: 'seagreen'}}>{this.state.result}</div>
         </div>
      )
   }
}

```

<br />

## 3. hooks

* html의 for와 class는 javascript의 예약어에 해당하기 때문에 for → htmlFor, class → className으로 작성해야 한다. 

```javascript

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

```




