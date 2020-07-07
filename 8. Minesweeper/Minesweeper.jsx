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
   halted: true,
   dispatch: () => {},
});

const initialState = {
   tableData: [],
   timer: 0,
   result: '',
   halted: true, // 게임 중단 
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


// action
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';


const reducer = (state, action) => {
   switch(action.type){
      case START_GAME : 
         return {
            ...state,
            tableData: plantMine(action.row, action.cell, action.mine),
            halted: false,
         }
      case OPEN_CELL: {
         // immutable
         // 클릭한 셀이 CODE.OPENED로 바뀌고 -> TD에 dispatch
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         tableData[action.row][action.cell] = CODE.OPENED;
         // 주변 셀 구하기 : 클릭한 칸의 주변 8칸을 검사한다. 

         let around = [];
         if(tableData[action.row -1 ]){ //윗줄이 있는지 check -> 윗줄의 3칸을 넣어준다. 
            around = around.concat(
               tableData[action.row - 1][action.cell - 1], 
               tableData[action.row - 1][action.cell], 
               tableData[action.row - 1][action.cell + 1]
            );
         }
         around = around.concat(
            tableData[action.row][action.cell - 1], 
            tableData[action.row][action.cell + 1], 
         );
         if(tableData[action.row + 1 ]){ //아랫줄이 있는지 check -> 아랫줄의 3칸을 넣어준다. 
            around = around.concat(
               tableData[action.row + 1][action.cell - 1], 
               tableData[action.row + 1][action.cell], 
               tableData[action.row + 1][action.cell + 1]
            );
         }
         // 주변에 설치된 지뢰의 수를 계산한 후 갯수 표시
         const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
         tableData[action.row][action.cell] = count;
         return {
            ...state,
            tableData,
         };
      }
      case CLICK_MINE: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         tableData[action.row][action.cell] = CODE.CLICKED_MINE; 
         return {
            ...state,
            tableData,
            halted: true,
         };
      }
      case FLAG_CELL: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         if(tableData[action.row][action.cell] === CODE.MINE){
            tableData[action.row][action.cell] = CODE.FLAG_MINE; 
         } else {
            tableData[action.row][action.cell] = CODE.FLAG;
         }
         return {
            ...state,
            tableData,
         };
      }
      case QUESTION_CELL: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
            tableData[action.row][action.cell] = CODE.QUESTION_MINE; 
         } else {
            tableData[action.row][action.cell] = CODE.QUESTION;
         }
         return {
            ...state,
            tableData,
         }
      }
      case NORMALIZE_CELL: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...state.tableData[action.row]];
         if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
            tableData[action.row][action.cell] = CODE.MINE; 
         } else {
            tableData[action.row][action.cell] = CODE.NORMAL;
         }
         return {
            ...state,
            tableData,
         }
      }
      default :
         return state;
   }
};



const Minesweeper = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const { tableData, halted, timer, result } = state;

   const value = useMemo(() => (
      { tableData: tableData, dispatch, halted, }
   ), [tableData, halted]);

   return (
      <div id="Minesweeper">
         <TableContext.Provider value={value}>
            <Form />
            <div className="timer">{timer}</div>
            <Table />
            <div className="result">{result}</div>
         </TableContext.Provider>
      </div>
   )
};

export default Minesweeper;