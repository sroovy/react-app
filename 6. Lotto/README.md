# 🤹🏼‍♀️ 6. Lotto lottery

<img src="https://github.com/lee-suyeon/webgame/blob/master/img/lotto.gif?raw=true" width="400px" alt="responseCheck"></img>

<br>

## 1. 실행 순서
1. 1 ~ 45의 숫자 중 랜덤으로 7개를 뽑는다. 
2. 당첨 숫자가 1초 간격으로 화면에 나타난다.
3. 리셋 버튼을 누르면 새로운 숫자를 다시 뽑는다. 
<br>
---
<br>

## 2. getWinNumbers() 
- 당첨 숫자와 보너스 숫자를 리턴하는 함수
   1. 1 ~ 45가 들어있는 배열을 만든다. 
   2. 무작위로 숫자를 뽑아서 다시 배열 shuffle 을 만든다. 
   3. 당첨 숫자 : shuffle 배열에서 1 ~ 6번째 숫자를 뽑는다. 
   4. 보너스 숫자 : shuffle 배열에서 마지막 숫자를 뽑는다.
   5. 당첨 숫자와 보너스 숫자를 원소로 하는 배열을 반환한다. 
```javascript
function getWinNumbers() {
   const candidate = Array(45).fill().map((v, i) => i + 1);
   const shuffle = [];
   while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
   }
   const bonusNumber = shuffle[shuffle.length - 1];
   const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
   return [...winNumbers, bonusNumber];
};

```
---
<br />

## 3. Class 
### 3-1 state와 render

```javascript
class Lotto extends Component {
   state = {
      winNumbers: getWinNumbers(), // 숫자를 미리 뽑아둔다. 
      winBalls: [], // 당첨 공
      bonus: null, // 보너스 공
      redo : false // reset
   };

   // 타이머 배열
   timeouts = [];

   render() {
      const { winBalls, bonus, redo } = this.state;
      return (
         <div id="Lotto">
            <div id="numbers">당첨 숫자</div>
            <div id="result">
               {winBalls.map((v) => <Balls key={v} number={v} />)}
            </div>
            <div id="bonus">보너스</div>
               { bonus && <Balls number={bonus} />}
               { redo ? <button className="redo" onClick={this.onClickRedo}>한번 더!</button> : null}
         </div>
      )
   }
}

```
### 3-2 Ball Component
- 부모 컴포넌트로부터 숫자를 물려받는다. 
- 숫자에 따라 색을 다르게 설정한다. 
- class에서는 PureComponent를 함수형 컴포넌트에서는 memo로 감싸주어 최적화 시킨다. 

```javascript
class Balls extends PureComponent {
    render () {
        const { number } = this.props;
        let background;
        if(number <= 10) {
            background = '#fcbdab';
        } else if(number <= 20){
            background = '#94d183';
        } else if(number <= 30){
            background = '#6ebda8';
        } else if(number <= 40){
            background = '#269493';
        } else {
            background = '#20485a';
        }
        return (
        <div className="ball" style={{ background }}>{number}</div>
        )
    }
}
```

### 3-2 Timer & reset
- 로또 추첨 타이머 함수
   1. 6개의 당첨 숫자가 1초 간격으로 화면에 나타난다. 
   2. 7초 후에 보너스 숫자가 화면에 나타난다. 
- redo 버튼을 누르면 화면과 타이머 배열이 초기화 된다. 
```javascript
// 로또 추첨 타이머 함수
lotteryBalls = () => {
   const { winNumbers } = this.state;
   for(let i = 0; i < winNumbers.length - 1; i++){
      this.timeouts[i] = setTimeout(() => {
         this.setState((prevState) => {
            return {
               winBalls: [...prevState.winBalls, winNumbers[i]]
            }
         })
      }, 1000 * (i + 1));
   }
   this.timeouts[6] = setTimeout(() => {
      this.setState({
         bonus : winNumbers[6],
         redo: true,
      })
   }, 7000);
}

onClickRedo = () => {
   this.setState({
      winNumbers: getWinNumbers(), 
      winBalls: [], 
      bonus: null, 
      redo: false
   });
   this.timeouts = [];
}
```

### 3-3 Life Cycle
 1. componentDidMount : 첫 렌더링 후 타이머 실행
 2. componentDidUpdate : winBalls 배열의 원소 갯수가 0이 되면(리셋 버튼을 눌렀을 때) 타이머 실행
 3. componentWillUnmount : 타이머 제거 

```javascript
componentDidMount () {
   this.lotteryBalls();
}

componentDidUpdate (prevProps, prevState) {
   if (this.state.winBalls.length === 0) {
      this.lotteryBalls();
   }
}

componentWillUnmount () {
   this.timeouts.forEach((v) => {
      clearTimeout(v);
   });
}

```


<br>

## 4. Hooks
### 4-1. useEffect
- class의 라이프 사이클을 useEffect 로 구현한다. 
- useEffect의 두번째 inputs이 빈 배열일 때에는 componentDidMount와 같은 동작을 수행한다. 
- 두번째 파라미터인 inputs 배열에 요소가 요소가 있으면 componentDidMount + componentDidUpdate와 같은 동작을 수행
```javascript
useEffect(() => {
   // 첫 렌더링 후 실행 → componentDidMount
   for(let i = 0; i < winNumbers.length -1; i++){
      timeouts.current[i] = setTimeout(() => {
         setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
   }
   timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
   }, 7000); 
   
   // 타이머 제거 → componentWillUnmount
   return () => {
      timeouts.current.forEach((v) => {
         clearTimeout(v);
      });
   }
}, [timeouts.current]);  //timeouts.current가 바뀔 때만 effect를 재 실행 → componentDidUpdate
```
<br>

* 함수형 컴포넌트에서 componentDidMount에서는 실행이 안되고 componentDidUpdate에서만 실행시키고 싶을 때 useEffect로 구현하는 Tip!
```javascript
const mounted = useRef(false);
useEffect(() => {
   if(!mounted.current) { // 실행은 하지만 아무일도 하지 않는다. 
      mounted.current = true;
   } else {
      //ajax 요청 등 
   }
}, [바뀌는 값]); // 바뀌는 값에 따라 실행
```
---
<br>


### 4-2. useMemo
* 함수형 컴포넌트는 react 앱에서 렌더링이 일어날 때마다 함수 전체가 다시 실행된다. 
* useMemo를 이용하여 함수의 인자로 넘어오는 값이 기존과 동일한 경우 다시 함수를 호출하여 값을 구하는 대신 기존에 메모리 어딘가에 저장해두었던 값을 그대로 사용할 수 있다. → **memoization**
* 복잡한 함수의 return 값을 기억. 
* useMemo로 전달된 함수는 렌더링 중에 실행된다.
* 첫번째 인자 : 결과값을 생성해주는 팩토리 함수
* 두번째 인자 : 결과값을 재활용 할때 기준이 되는 입력값 배열
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
* useMemo를 쓰지 않으면 당첨 공이 화면에 나타날 때마다 getWinNumbers()함수가 계속 실행된다. -> 함수 전체가 재실행되기 때문
* getWinNumbers() 함수가 다시 실행되지 않고 return값만 기억해둔다. 
* 두번째 인자인 배열의 요소가 변하면 getWinNumbers()는 다시 실행된다. 
```javascript
const lottoNumbers = useMemo(() => getWinNumbers(), []);
const [winNumbers, setWinNumbers] = useState(lottoNumbers);
```

<br>

---

<br>

### 4-3. useCallback
* 함수 자체를 반환  → 함수 Component가 재 실행되어도 함수가 재 생성되지 않는다.
* useCallback 안에서 쓰이는 state들은 inputs 배열에도 넣어주어야 한다.
   → 자식 컴포넌트에 함수를 넘길 때 useCallback이 없으면 매번 새로운 함수가 생성되는데 자식 컴포넌트에 매번 새로운 함수를 전달하면 자식 컴포넌트는 부모로 부터 받은 프롭스가 바뀐걸로 인지해서 매번 새로 렌더링한다. 
* 자식 컴포넌트에 함수를 전달 해 줄 경우 useCallback을 사용하면 매번 새로운 함수가 생성되는 불필요한 렌더링을 방지할 수 있다.
* 첫번째 인자 : 실행시킬 함수
* 두번째 인자 : 함수를 재 실행 시킬 기준이 되는 입력값 배열(빈 배열일 땐 한번만 실행되어진다. )
```javascript
   const onClickRedo = useCallback(() => {
      setWinNumbers(getWinNumbers());
      setWinBalls([]);
      setBonus(null);
      setRedo(false);
      timeouts.current = [];
   }, [winNumbers]); //winNumbers의 상태가 변하면 함수가 다시 실행된다. 
```

<br>

---

<br>