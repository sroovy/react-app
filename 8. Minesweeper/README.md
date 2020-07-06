CONTEXT API

를 설정하면 그 아래에 있는 어떠한 컴포넌트에서도
부모를 거치지 않고 값을 바로 받을 수 있다. 



1. dispatch를 props로 전달
```javascript
const Minesweeper = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <>
         <Form dispatch={dispatch}/>
         <div>{state.timer}</div>
         <Table />
         <div>{state.result}</div>
      </>
   )
};
```

```javascript
const Form = ({ dispatch }) => {

   return (
      <form>
         <input type="number" placeholder="row" value={row} onChange={onChangeRow} />
         <input type="number" placeholder="cell" value={cell} onChange={onChangeCell} />
         <input type="number" placeholder="mine" value={mine} onChange={onChangeMine} />
         <button onClick={onClickBtn}>Start</button>
      </form>
   )
};

```

2. context API 쓰는 방법

1.  createContext 불러오기
함수이기 때문에 실행을 해준다. 
2. Data들에 접근하고 싶은 component를 tableContext.provider로 묶어준다. -> 하위 컴포넌트에서 데이터 접근이 가능하다. 
3. data는 value 값으로 넣어준다. (자식 컴포넌트들에게 바로 전달해줄 data)
-> 성능 최적화하기가 엄청 힘듬... 
Minesweeper가 새로 리랜더링 될 때마다 value로 물려준 객체도 새로 생긴다
= context API를 쓰는 자식들도 새롭게 리랜더링 된다. 
-> 캐싱을 해준다. 

```javascript
import React, { useReducer, createContext } from 'react';

// 다른 파일에서 쓸 수 있게 export
export const TableContext = createContext({ // 초기값
   tableData: [],
   dispatch: () => {},
});

const Minesweeper = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
         <Form />
         <div>{state.timer}</div>
         <Table />
         <div>{state.result}</div>
      </TableContext.Provider>
   )
};
```

* useMemo로 캐싱하기
state.tableData 값이 변경 될 때 갱신해준다. 
** dispatch는 항상 같게 유지 되기 때문에 바뀌는 목록에 추가 안해도 된다.  

```javascript
const value = useMemo(() => (
      { tableData: state.tableData, dispatch }
   ), [state.tableData]); 

   return (
      <TableContext.Provider value={value}>
         <Form />
         <div>{state.timer}</div>
         <Table />
         <div>{state.result}</div>
      </TableContext.Provider>
   )
};
```


useReducer 순서
1. 입력한 값(row, cell, mine)을 액션에 전해준다 
```javascript
// Form component

  const onClickBtn = useCallback((e) => {
      dispatch({ type: START_GAME, row, cell, mine });
   },[row, cell, mine]);
```
2. 액션을 만들어 주고 액션이 실행되었을 때 어떠한 동작을 할지 reducer를 통해 정해준다. 
```javascript
//Minesweeper Component

export const START_GAME = 'START_GAME';


```