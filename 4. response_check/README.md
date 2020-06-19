# 4. 반응 속도 체크 ✔️

<img src="https://github.com/lee-suyeon/webgame/blob/master/img/responseCheck.gif?raw=true" width="400px" alt="responseCheck"></img>

## 1. 순서

1. 화면을 클릭한다.
2. 빨간색으로 화면이 바뀐다.
3. 화면이 초록색이 되면 클릭한다. 
4. 반응속도가 나타나고 첫 화면으로 돌아간다. 
5. 초록색으로 바뀌기 전에 클릭하면 실패 메세지가 나오고 1초 뒤 첫 화면으로 돌아간다. 

---


## 2. Class

### 1. state, render()
* state 설정 
    - 클릭할 때 마다 screen의 상태가 변경된다
    → state값을 screen의 className으로 설정해놓고, state 값이 바뀔 때마다
    거기에 맞는 css가 적용된다. 
    - 결과값의 초기값은 빈 배열로 설정한다.  
    → 맨 처음 랜더링이 됐을 때는 화면에 나타나지 않도록 설정한다 **(조건문)** 
```javascript

class ResponseCheck extends Component {
    state = {
        state : 'waiting', //screen의 상태
        message : '⚡️ Click anywhere to start ⚡️',
        result : []
    }

    render () {
        const { state, message } = this.state;
        return (
            <div id="responseCheck">
                <div 
                    id="screen" 
                    className={state} 
                    onClick={this.onClickScreen}>{message}
                    <div className="average">{this.renderAverage()}</div>
                </div>
            </div>
        )
    }
}
```

### 2. **renderAverage()** : 평균 반응 속도를 계산하는 함수
* 처음 렌더링했을때 result는 빈 배열이다. **(빈 배열에서 초기값 없이 reduce()를 호출하면 오류가 발생)**   
→ 조건문을 이용해서 맨 처음 렌더링이 됐을 떄는 화면에 나타나지 않게 하고,    
   result 배열에 요소가 추가 되면 평균값이 화면에 나타난다.
* JSX에서는 자바스크립트 조건문처럼 if나 switch문으로 처리가 불가능하기 때문에 삼항연산자나 AND연산자로 구성한다.

1. 삼항연산자 
```javascript
renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 
        ? null 
        : <div className="average"> Average : {result.reduce((a, c) => a + c ) / result.length}ms</div>
}
```
2.  && 연산자

* 조건 && expression : 조건이 true이면 expression을 실행하고, false면 무시한다. 

```javascript
renderAverage = () => {
    const { result } = this.state;
    return result.length !== 0 && 
        <div className="average"> Average : {result.reduce((a, c) => a + c ) / result.length}ms</div>
}
```

3. 즉시 실행 함수
* jsx안에서는 못 쓰지만 함수안에서는 쓸 수 있다.
```javascript
{() => {
    if(result.length === 0) {
        return null;
    } else {
        return <div className="average"> Average : {result.reduce((a, c) => a + c ) / result.length}ms</div>
    }
}()} // 함수 선언과 동시에 호출
```

### 3. **onClickScreen()**
1. 처음 클릭을 하면 state가 ready 상태로 바뀐다.
2. 타이머가 실행되고 2~3초(랜덤 초) 후에 화면이 초록색으로 바뀐다.   
    → startTime을 호출하는 함수도 함께 실행된다
**new Date()** :  함수가 실행되는 시점에 날짜 및 시간 데이터를 갖고 오는 함수.
3. 화면이 초록색으로 바뀌고 클릭했을 때, screen은 초기화되고 endTime을 가져온다. 
4. endTime - startTime = 반응 시간
5. 초록색으로 화면이 바뀌기 전에 클릭 했을 땐 실패 메세지가 나오고 1초 뒤에 초기화된다. 
6. 여러번 시도할 수록 renderAverage함수에 의해 반응 시간 평균값이 구해진다. 

```javascript

startTime;
endTime;
timer;

onClickScreen = () => {
    const { state, message, result } = this.state;
    if(state === 'waiting'){ // 처음 클릭했을 때
        this.setState({
            state : 'ready',
            message: 'Wait for green 🍀'
        });
        this.timer = setTimeout(() => {
            this.setState({
                state: 'now',
                message: 'Click! 👌'
            });
            this.startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 사이의 랜덤 초
        }
        if (state === 'ready'){ // 초록색 화면이 나오기 전에 클릭했을 때
            clearTimeout(this.timer);
            this.setState({
                message: 'Too soon 🙅‍♀️'
            });
            setTimeout(() => {
                this.setState({
                    state: 'waiting',
                    message: '⚡️ Click anywhere to start ⚡️'
                });
            }, 1000);
    } else if(state === 'now'){ // 반응속도 체크
        this.endTime = new Date();
        this.setState((prevState) => {
            return {
                state: 'waiting',
                message: '⚡️ Click anywhere to start ⚡️',
                result : [ ...prevState.result, this.endTime - this.startTime ]
            }
        });
    }
}

```

## 3. Hooks 
* Class와 차이점

### 1. UseRef
* DOM에 접근할 대
* 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리
* 값이 바뀌기는 하지만 화면에 영향을 미치고 싶지 않을때 state 대신 사용한다. 
    → **값이 바껴도 렌더링이 되지 않는다.**
* ref는 current로 접근해야한다. 

```javascript
//class
startTime;
endTime;
timer;

//hooks
const timer = useRef(null);
const startTime = useRef();
const endTime = useRef();

// 타이머설정
timer.current = setTimeout(() => {
    setState('now');
    setMessage('Click! 👌');
    // 시작 시간 가져오기
    startTime.current = new Date();
}, Math.floor(Math.random() * 9) + 2000);

// 타이머 취소
clearTimeout(timer.current);

endTime.current = new Date();

```

