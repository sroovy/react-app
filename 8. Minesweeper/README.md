CONTEXT API

를 설정하면 그 아래에 있는 어떠한 컴포넌트에서도
부모를 거치지 않고 값을 바로 받을 수 있다. 

정리: CONTEXT API쓰면  createContext를 해서 기본 데이터를 넣어주고
Context.Provider해서 자식들한테 전달할 value를 useMemo를 통해 캐싱을 해준다. 
자식 컴포넌트에서 useContext를 사용해서 
const { tableData, dispatch, halted } = useContext(TableContext);
provider의 밸류로 전달받은 데이터를 바로 사용할 수 있다. 

최적화 문제가 있기 때문에 memo, useMemo로 최적화 해준다. 
함수는 100번 호출되어도 실제로 컴포넌트는 한번만 렌더링 되게 최적화를 해준다. 


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

[document.oncontextmenu]

마우스 오른쪽을 눌렀을때 나오는 메뉴를 contextmenu 라고 합니다.


context API를 쓰면 기본적으로 state가 바뀔 때마다 
useContext를 쓰는 부분이 리랜더링 된다. 


Td 최적화 방법
1. useMemo
   // console.log('td rendered') 100번실행됨
   // 함수 자체는 실행되도 return 부분만 캐싱을 해주면 된다. 
   // 값을 캐싱하는 useMemo를 사용한다. 

   return useMemo(() => (
   <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
   >{getTdText(tableData[rowIndex][cellIndex])}</td>
   ), [tableData[rowIndex][cellIndex]]);
});


2. 컴포넌트로 분리

return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />

const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
   return (
      <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
   >{getTdText(data)}</td>
   )
});
