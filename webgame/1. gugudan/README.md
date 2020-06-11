# 1. 구구단 9️⃣✖️9️⃣

<br />
<img src="https://github.com/lee-suyeon/react-app/blob/master/webgame/img/gugudan.JPG?raw=true" width="450px" alt="gugudan"></img>
<br/>

## 1. 게임 순서
1. 1에서 9까지 랜덤한 숫자가 선택되어진다. 
2. input에 정답을 입력한다.
3. 답을 체크한다. 
4. **정답**을 입력했을 경우 : 정답과 함께 숫자와 폼이 리셋된다.
5. **오답**을 입력했을 경우 : 오답 메세지와 함께 폼만 리셋된다. 

***

<br/>

## 2. Class

### 1.  **getNumber()** : 랜덤한 숫자를 return 함수(class 밖에 생성)
```javascript
const getNumber = () => {
  return Math.ceil(Math.random() * 9);
}
```
<br/>

### 2. **state** 와 **render** 함수 작성
```javascript

class GuGuDan extends Component {
  //constructor(props) { -> 생략가능
  //    super(props);

  // 초기 state값 설정
   state = {
      first : getNumber(), //랜덤한 숫자
      second : getNumber(),  //랜덤한 숫자
      value: '',  //입력값
      result: '???'  //결과
  }

   render () {
      return (
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

```
<br />

### 3. Class 메소드
* Class 내에서 함수를 만들 때에는 화살표 함수를 이용한다.
   * 화살표 함수 내에서 this는 GuGuDan Component
   * 일반 함수 내에서 this는 undefined


1.  **onChangeValue()** : input의 입력값을 받아온다.
```javaScript
onChangeValue = (e) => {
   this.setState({
      value: e.target.value
   });
}
```
* 일반 함수로 쓸 경우 bind함수를 이용해야한다. 
```javascript
   onChangeValue = function (e) {
      this.setState({
         value: e.target.value
      });
   }.bind(this);
```
<br/>

2. **onSubmitValue()** : input의 입력값을 제출한다.

* 함수형 setState : 예전 state 값을 return.   
예전 state값으로 현재 state값을 만들 때 사용한다.
* setState는 **비동기**적으로 작동한다. 

```javaScript
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
```
<br/>

3. **onRefInput**
* document.querySelector('input').focus(); 와 같은 역할

```javascript
input; //input 선언
onRefInput = (c) => {this.input = c; } // focus 함수
```
<br/>

***

<br/>

## 3. Hooks
* Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수
* 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 내장 Hook을 제공한다. 

```javascript
const GuGuDan = () => {
   return
}
```


### 1. useState
* 현재의 state 값과 이 값을 업데이트하는 함수를 쌍으로 제공
* useState는 인자로 초기 state 값을 받고 이 초기값은 첫 번째 렌더링에만 딱 한번 사용된다.
```javascript
import React, { useState } from 'react'; // hook 호출

const GuGuDan = () => {
   const [first, setFirst] = useState(getNumber());
   const [second, setSecond] = useState(getNumber());
   const [value, setValue] = useState('');
   const [result, setResult] = useState('???');

   return (
      <div id="gugudan">
         <div className="questions">{first} &times; {second} 은?</div>
         <form onSubmit={onSubmitForm}>
            <input  ref={ inputRef } type="number" value={value} onChange={onChangeValue} />
            <button type="submit">check</button>
         </form>
         <div className="result">{result}</div>
      </div>
   );
};

```
<br/>

### 2. setState
* class의 this.setState와 거의 유사하지만, 이전 state와 새로운 state를 합치지 않는다는 차이점이 있다. 
```javascript
const onChangeValue = (e) => {
   setValue(e.target.value);
}

const onSubmitForm = (e) => {
   e.preventDefault();
   if(parseInt(value) === first * second){ 
      // setState를 한번에 모아서 비동기로 처리 -> 렌더가 한번만 실행
      setFirst(getNumber());
      setSecond(getNumber());
      setResult((prevResult) => value + ' 정답입니다');
      setValue('');
      inputRef.current.focus();
   } else {
      setResult('정답이 아닙니다');
      setValue('');
      inputRef.current.focus();
   }
};

```

### 3. useRef
* useRef는 .current 프로퍼티에 변경 가능한 값을 담고 있는 “상자”와 같다.
```javascript
const inputRef = React.useRef(null);

inputRef.current.focus();

<input  ref={ inputRef } />
```
