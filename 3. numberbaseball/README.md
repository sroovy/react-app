# 3. 숫자 야구⚾️

<br />
<img src="https://github.com/lee-suyeon/react-app/blob/master/webgame/img/numberbaseball.JPG?raw=true" width="450px" alt="wordrelay"></img>
<br/>

## 1. 게임 순서
1. 4자리로 된 임의의 숫자를 정한다. (중복 X)
2. 입력창에 4자리의 숫자를 입력한다. 
3. 숫자는 맞지만 위치가 틀리면 **볼**, 숫자와 위치가 전부 맞으면 **스트라이크**
4. 숫자를 맞추면 **홈런**, 10번 이내에 숫자를 못 맞추면 실패! 


<br/>

***

<br/>

## 2. import & require
 : 코드 가장 위에 패키지를 읽어 들인다
* exports 되는 게 객체나 배열이면 구조분해 할 수 있다. 
* module.exports 와 export default 서로 호환이 된다.
* 노드로 웹팩을 돌리기 때문에 노드의 모듈 문법만 지원하는데 babel이 import를 require로 바꿔 주기 때문에 사용이 가능하다. 
* 노드에서는 require를 쓰고 react에서는 import를 쓴다. 

1. require : node의 모듈 시스템, 자바스크립트(Common JS) 자체가 지원하는 패키지 읽는 방법
* 불러오기
    ```javascript
    const React = require('react');
    ```
* 내보내기
    ```javascript
    exports.hello = 'hello';
    module.exports = NumberBaseball;
    ```
<br />

2. import : es2015 모듈 문법

    ```javascript
    import React, { Component } from 'react';
    import { hello } from 'hello';
    import NumberBaseball from './webgame';
    ```

* 내보내기
    * default는 한번만 쓸 수 있다.
    ```javascript
    export const hello = 'hello'; 
    export default NumberBaseball;
    ```

<br />

---

<br />

## 3. numberbaseball

### 1. **getNumbers()** :  4자리로 된 임의의 숫자를 반환하는 함수
* 뽑힐 숫자 후보와 뽑힌 숫자가 들어갈 빈 배열을 변수로 정한다. 
    ```javascript
    const getNumbers = () => { 
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
        const numbers = []; 
    };
    ```

* 반복문을 작성해서 숫자를 뽑는다. 
* 한 번 뽑을 때마다 숫자 후보의 개수가 줄어 들기 때문에 i를 빼줘야한다
    > Math.floor(Math.random() * 9)에서 나올 수 있는 숫자의 범위는 0 ~ 8 이고 candidates배열의 원소 index와 동일 하다.   
    > i가 0일때 랜덤으로 뽑힌 숫자가 3이라면 candidates.splice(3, 1)이 되고 뽑힌 숫자는 4가 된다. → candidates = [1, 2, 3, 5, 6, 7, 8, 9]   
    > i가 1일때 랜덤으로 뽑힌 숫자가 8이 된다면 candidates.splice(8, 1)이 되고   
    > candidates배열에 8번째 원소가 존재하지 않기 때문에 undefined를 반환한다. 
* splice메소드는 배열을 반환하기 때문에 [0]을 붙여 숫자에 접근한다.
* 뽑힌 4개의 숫자를 numbers에 넣어주고 반환한다. 

    ```javascript
    const getNumbers = () => { 
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const numbers = [];
        for(let i = 0; i < 4; i++){
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // 배열을 반환하기 때문에
            numbers.push(chosen);
        }
        return numbers; // [7, 5, 1, 3]
    };

    ```

### 2. state
1. state 
    * result
        - 게임중 : ⚾️Number Baseball⚾️
        - 정답 : 홈런
        - 10번 이상 시도 : 실패
    * value : 입력값
    * answer : 컴퓨터가 랜덤으로 뽑은 4자리 숫자
    * tries : 시도 결과(입력 숫자, n볼 n스트라이크입니다)
```javascript
state = {
    result: '⚾️Number Baseball⚾️',
    value: '',
    answer: getNumbers(),
    tries: []
};
```

<br/>

### 3. onSubmitForm
* answer값이 배열이기 때문에 join()로 문자열로 만들어준다. 
* tries : 뭐가 바꼈는지 react가 감지하지 못하기 때문에 push를 쓰지 않는다. **immutable**    
    예전 state === 지금 state → false가 나와야 리액트가 변경을 감지하고 렌더링을 해준다. 

```javascript
onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if(value === answer.join('')){ // 정답일 때,
        this.setState({
            result: "홈런!",
            value: '',
            tries: [...tries, { try : value, result: '홈런!'}]
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
            this.setState({
                tries: [...tries, { id: tries.length, try: value, result: `${strike}스트라이크 ${ball}볼 입니다` }],
                value: '',
            });
            this.inputRef.current.focus();
        }
    }
}
```

2. Try
* 숫자를 입력하면 시도 리스트가  추가된다. 
* 리액트에서 반복문은 map()를 이용한다. 
    > **map()**   
    > 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.    
    > map메소드를 쓸 때에는 **key**를 추가해줘야한다. 
* NumberBaseball Component에서 Try Component로 'tryInfo' props를 전달한다. 

- **props** : 부모 컴포넌트가 자식 컴포넌트한테 물려주는 속성
```javascript
<ul>
    {tries.map((v) => { // v ->  { id: tries.length, try: value, result: `${strike}스트라이크 ${ball}볼 입니다` } 를 전달
        return (
            <Try key={`${v.id}시도`} tryInfo={v}/>
        );
    })}
</ul>
```
* 전달받은 'tryInfo' props에 접근한다. 
```javascript
class Try extends Component {
    render () {
        const { tryInfo } = this.props;
        return (
            <li>
                <em>{ tryInfo.try }</em><span>{ tryInfo.result }</span>
            </li>
        )
    }
}
```














