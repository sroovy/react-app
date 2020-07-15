useReducer : Redux의 reducer 부분을 가지고 옴
Redux랑 비슷한 효과 

Table -> Tr -> Td
O와 X가 턴을 번갈아 가면서 진행된다. 

```javascript
const TicTacToe = () => {
  const [winner, setWinner] = useState(''); // 승자가 누구인지
  const [turn, setTurn] = useState('O'); //지금 턴이 누구인지
  const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 2차원 배열로 3*3을 화면에 표현 
}
  ```

  * 문제점
  컴포넌트 구조가 TicTacToe > Table > Tr > Td 4단으로 되어있다. 
  state는 가장 위 부모인 택택토에서 관리하게 되는데 실제로 클릭하는 것은 Td이다. 전달을 해주기 위해선 테이블과 tr을 거쳐야 td로 전달이 가능하다. 
    state갯수를 줄이는 useReducer을 사용한다. -> 하나의 state로 통일이 가능하다. 


* useReducer(reducer, initialState)
* initialState : 만들었던 state들을 객체로 다 묶는다. 
* reducer는 함수이다. -> state를 어떻게 바꿀지 적어준다. 
    state, action을 매개변수로 받는다. 
```javascript
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

const reducer = (state, action) => {
    
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
}
```

* reducer, action, dispatch의 관계 
디스패치안에 액션객체를 넣어주고 그 안에 type
action 객체 : { type: "SET_WINNER", winner: "O"}
    action만 있다고 해서 자동으로 state가 바뀌는건 아니고 액션을 해석해서 state를 직접 바꿔주는 역할을 하는것이 reducer
액션을 dispatch 할때마다 reducer함수가 실행된다. 
reducer 함수 안에서 switch문으로 타입별로 구분을 한다. 
dispatch : action을 실행한다. 
dispatch에서 state를 바꾸는 것은 비동기이다. 
비동기 state에 따라 무언가를 처리할때는 useEffect를 사용한다. 


```javascript
const reducer = (state, action) => {
    switch (action.type) { // 테이블 클릭 -> 액션이 디스패치 -> 액션타입이 뭔지 구분 
        case "SET_WINNER" : // 만약에 SET_WINNER라는 액션이면 
            return { // state를 어떻게 바꿀지
                // state.winner = action.winner 로 직접 바꾸면 안된다 
                ...state,// 기존 state의 얕은 복사 
                winner: action.winner, //바뀔 부분만 복사해준다. 
            }
    }
}


const onClickTable = useCallback(() => {
    dispatch({ type: "SET_WINNER", winner: "O"});
}, []);

  return (
    <>
      <Table onClick={onClickTable} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
```

*Component에 넣는 함수들은 다 useCallback


state는 직접 바꿀 수 없으니 이벤트를 실행해서 액션을 dispatch해서 state를 바꾼다. state를 어떻게 바꿀지는 reducer에 기록한다. 
액션 타입은 대문자로 하고 변수로 빼놓는게 좋다. 



정리
지금까지는 useState를 써서 state를 여러개 만들었었는데 수가 점점 많아지면 관리하기가 어렵다. state들을 한번에 모아서 관리할 수 있다. 
setState도 dispatch로 한번에 처리하기 위해 useReducer를 사용한다. 

state를 하나로 모아두고 action을 통해서만 변경한다. 
액션의 타입은 액션의 이름이다. 
액션을 디스패치하면 액션이 실행이 되는데 reducer 함수에 정의해놓은대로
state를 바꾼다. state를 바꿀 때에는 불변성이 중요하다 

* state들이 많아질 때에는 useReducer를 고려하자. 