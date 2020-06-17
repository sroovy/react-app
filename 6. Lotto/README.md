# 🤹🏼‍♀️ 6. Lotto lottery



<br>

## useMemo
* react 앱에서 렌더링이 일어날 때마다 함수 전체가 다시 실행된다. 
* useMemo를 이용하여 함수의 인자로 넘어오는 값이 기존과 동일한 경우 다시 함수를 호출하여 값을 구하는 대신 기존에 메모리 어딘가에 저장해두었던 값을 그대로 사용할 수 있다. 
* useMemo로 전달된 함수는 렌더링 중에 실행된다.
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
* 첫번째 인자 : 결과값을 생성해주는 팩토리 함수
* 두번째 인자 : 결과값을 재활용 할때 기준이 되는 입력값 배열

<br>

---

<br>

## useCallback
* 함수 자체를 반환  → 함수 Component가 재 실행되어도 함수가 재 실행되지 않는다.
* useCallback 안에서 쓰이는 state들은 inputs 배열에도 넣어주어야 한다.
* 자식 컴포넌트에 함수를 전달 해 줄 경우 useCallback을 사용하면 매번 새로운 함수가 생성되는 불필요한 렌더링을 방지할 수 있다.
```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
* 첫번째 인자 : 실행시킬 함수
* 두번째 인자 : 함수를 재 실행 시킬 기준이 되는 입력값 배열(빈 배열일 땐 한번만 실행되어진다. )

<br>

---

<br>

## Class vs Hooks

### Class


```javascript

// 로또 추첨 타이머 함수
runTimeouts = () => {
   const { winNumbers } = this.state; 
   for(let i = 0; i < winNumbers.length -1; i++){
      this.timeouts[i] = setTimeout(() => {
         this.setState((prevState) => {
            return {
               winBalls: [...prevState.winBalls, winNumbers[i]]
            };
         });
      }, (i + 1) * 1000);
   }
   this.timeouts[6] = setTimeout(() => {
      this.setState({
         bonus: winNumbers[6],
         redo: true // 한 번 더 버튼이 보이게 된다. 
      });
   }, 7000); 
}

// 첫 렌더링 후 실행
componentDidMount () {
   this.runTimeouts();
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

// 초기화(재 렌더링) 시킬 때 실행
componentDidUpdate (prevProps, prevState) {
   if (this.state.winBalls.length === 0) {
      this.runTimeouts();
   }
}

// 타이머 제거
componentWillUnmount () {
   this.timeouts.forEach((v) => {
      clearTimeout(v);
   });
}

```


<br>

### Hooks
```javascript

// getWinNumbers 함수의 return값이 달라졌을 때만 
//변수 lottoNumber를 useState의 인자로 넘겨준다. 
const lottoNumbers = useMemo(() => getWinNumbers(), []);
const [winNumbers, setWinNumbers] = useState(lottoNumbers);


useEffect(() => {
   // 첫 렌더링 후 실행
   for(let i = 0; i < winNumbers.length -1; i++){
      timeouts.current[i] = setTimeout(() => {
         setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
   }
   timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
   }, 7000); 
   
   // 타이머 제거
   return () => {
      timeouts.current.forEach((v) => {
         clearTimeout(v);
      });
   }
}, [timeouts.current]);  //timeouts.current가 바뀔 때만 effect를 재 실행

const onClickRedo = useCallback(() => {
   setWinNumbers(getWinNumbers());
   setWinBalls([]);
   setBonus(null);
   setRedo(false);
   timeouts.current = []; // 바뀌는 부분 감지 -> useEffect의 inputs로 전달
}, [winNumbers]); //함수를 재 실행 시킬 기준이 되는 입력값 배열

```
<br>

---
<br>

## Result

![alt text](https://github.com/sroovy/react-app/blob/master/webgame/img/lotto.JPG?raw=true "Lotto")