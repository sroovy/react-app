import React, { useReducer, createContext, useMemo, useEffect } from 'react';
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
   data: {
      row: 0,
      cell: 0,
      mine: 0
   },
   timer: 0,
   result: '',
   halted: true, // 게임 중단 
   openedCount: 0,
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
export const INCREMENT_TIMER = 'INCREMENT_TIMER';


const reducer = (state, action) => {
   switch(action.type){
      case START_GAME : 
         return {
            ...state,
            data: {
               row: action.row,
               cell: action.cell,
               mine: action.mine
            }, // 가로줄, 세로줄, 지뢰갯수 기록
            openedCount: 0,
            timer: 0,
            tableData: plantMine(action.row, action.cell, action.mine),
            halted: false,
         }
      case OPEN_CELL: {
         // immutable
         // 클릭한 셀이 CODE.OPENED로 바뀌고 -> TD에 dispatch
         const tableData = [...state.tableData];
         //tableData[action.row] = [...state.tableData[action.row]];
         //tableData[action.row][action.cell] = CODE.OPENED;
         // 클릭한 칸만 불변성을 지키기 위해 새로운 객체로 만들어 주었는데
         //  주변 칸도 함께 오픈하기 때문에 어떤 칸이 불변성이 안지켜질지 모르기 때문에 
         // 모든칸을 새로운 객체로 만든다. 
         tableData.forEach((row, i) => {
            tableData[i] = [...state.tableData[i]];
         });
         // 한번 검사한 칸은 다시 검사하지 않도록 캐싱을 해준다. 
         const checked = [];
         // 열린 칸의 갯수를 센다 
         let openedCount = 0;
         // 클릭한 셀을 기준으로 주변칸을 검사하는 함수
         const checkAround = (row, cell) => {
            // 클릭했을 때 자동으로 열리면 안되는 칸 필터링
            if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
               return;
            }
            if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){ //상하좌우가 칸이 없는 경우 필터링
               return;
            }
            if (checked.includes(row + '/' + cell)) { // 이미 검사한 칸인지 체크
               return;
             } else {
               checked.push(row + '/' + cell);
             } 
            // 주변 셀 구하기 : 클릭한 칸의 주변 8칸을 검사한다. 
            let around = [
               tableData[row][cell - 1], tableData[row][cell + 1],
            ];
            if(tableData[row -1 ]){ //윗줄이 있는지 check -> 윗줄의 3칸을 넣어준다. 
               around = around.concat(
                  tableData[row - 1][cell - 1], 
                  tableData[row - 1][cell], 
                  tableData[row - 1][cell + 1]
               );
            }
            // 좌우칸이 없는 경우는 undefined가 되어서 filter에서 걸러짐 
            around = around.concat(
               tableData[row][cell - 1], 
               tableData[row][cell + 1], 
            );
            if(tableData[row + 1 ]){ //아랫줄이 있는지 check -> 아랫줄의 3칸을 넣어준다. 
               around = around.concat(
                  tableData[row + 1][cell - 1], 
                  tableData[row + 1][cell], 
                  tableData[row + 1][cell + 1]
               );
            }
            // 주변에 설치된 지뢰의 수를 계산한 후 갯수 표시
            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            // *** 주변에 지뢰가 없고 또 그 주변에 지뢰가 없을 때 연결해서 오픈
            if(count === 0){ 
               const near = [];
               if(row - 1 > -1){ //제일 윗칸을 클릭했을 때
                  near.push([row - 1, cell - 1]);
                  near.push([row - 1, cell]);
                  near.push([row - 1, cell + 1]);
               }
               near.push([row, cell - 1]);
               near.push([row, cell + 1]);
               if(row + 1 < tableData.length){ // 제일 아랫칸을 클릭했을 때 
                  near.push([row + 1, cell - 1]);
                  near.push([row + 1, cell]);
                  near.push([row + 1, cell + 1]);
               }
               near.forEach((n) => {
                  if (tableData[n[0]][n[1]] !== CODE.OPENED) { //주변칸들이 열려있지 않으면
                    checkAround(n[0], n[1]);
                  }
               })
            }
            if(tableData[row][cell] === CODE.NORMAL){ // 이미 열린칸을 중복으로 카운트 하지 않기 위한 조건
               openedCount += 1;
            } 
            tableData[row][cell] = count;
         };
         checkAround(action.row, action.cell);
         // 승리조건 
         let halted = false;
         let result = '';
         //console.log('state.open',state.openedCount);
         console.log('openedCount',openedCount);
         if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
            halted = true; // 게임을 멈추고
            result = `${state.timer}초만에 승리하셨습니다`
         }
         return {
            ...state,
            tableData,
            openedCount: state.openedCount + openedCount,
            halted,
            result
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
      case INCREMENT_TIMER: {
         return {
            ...state,
            timer: state.timer + 1,
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

   useEffect(() => {
      let timer; 
      if(halted === false){
         timer = setInterval(() => {
            dispatch({ type: INCREMENT_TIMER });
         }, 1000)
      }
      return () => {
         clearInterval(timer);
      }
   },[halted])

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