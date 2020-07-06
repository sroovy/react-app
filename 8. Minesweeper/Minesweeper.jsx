import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';


export const CODE = {
   MINE: -7,
   NORMAL: -1,
   QUESTION: -2,
   FLAG: -3,
   QUESTION_MINE: -4,
   FLAG_MINE: -5,
   CLICKED_MINE: -6,
   OPENED: 0 // 0이상이면 다 OPENED
}

export const TableContext = createContext({ // 초기값
   tableData: [],
   dispatch: () => {},
});

const initialState = {
   tableData: [],
   timer: 0,
   result: '',
}

// 지뢰 심는 함수
const plantMine = (row, cell, mine) => {
   console.log(row, cell, mine);
   // 0~99까지의 배열 생성
   const candidate = Array(row*cell).fill().map((arr, i) => {
      return i;
   });

   // 셔플 정렬
   // 0~99까지 중에서 지뢰 개수만큼 숫자를 랜덤으로 뽑아놓은 후 셔플 배열에 저장
   const shuffle = [];
   while (candidate.length > row * cell - mine){
      const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
      shuffle.push(chosen);
   }
   console.log(shuffle); // [91, 26, 70, 60, 62, 4, 13, 66, 17, 11, 73, 35, 79, 72, 37, 65, 76, 7, 31, 61]

   const data = [];
   for(let i = 0; i < row; i++){
      const rowData = [];
      data.push(rowData);
      for(let j = 0; j < cell; j++){
         rowData.push(CODE.NORMAL); // 10*10의 모든 원소가 -1인 2차원 배열이 생성 
      }
   }

   // 지뢰 심기
   for(let m = 0; m < shuffle.length; m++){
      const ver = Math.floor(shuffle[m] / cell);
      const hor = shuffle[m] % cell;
      data[ver][hor] = CODE.MINE;
   }
 
   return data; 
}



export const START_GAME = 'START_GAME';


const reducer = (state, action) => {
   switch(action.type){
      case START_GAME : 
         return {
            ...state,
            tableData: plantMine(action.row, action.cell, action.mine) 
         }
      default :
         return state;
   }
};



const Minesweeper = () => {
   const [state, dispatch] = useReducer(reducer, initialState);


   const value = useMemo(() => (
      { tableData: state.tableData, dispatch }
   ), [state.tableData]);

   return (
      <div id="Minesweeper">
         <TableContext.Provider value={value}>
            <Form />
            <div className="timer">{state.timer}</div>
            <Table />
            <div className="result">{state.result}</div>
         </TableContext.Provider>
      </div>
   )
};

export default Minesweeper;