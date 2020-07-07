import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './Minesweeper';

const getTdStyle = (code) => {
   switch(code){
      case CODE.NORMAL:
      case CODE.MINE:
         return {
            background: '#666',
            boxShadow: '2px 2px rgba(0, 0, 0, 0.4) inset'
         }
      case CODE.CLICKED_MINE:
      case CODE.OPENED:   
         return {
            background: '#fff',
         }
      case CODE.FLAG:
      case CODE.FLAG_MINE:
         return {
            background: '#f9ca24',
         }
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
         return {
            background: '#ff7979',
         }
      default:
         return {
            bakcground: '#fff'
         };
   }
};

const getTdText = (code) => {
   switch(code){
      case CODE.NORMAL:
         return '';
      case CODE.MINE:
         return '💣';
      case CODE.CLICKED_MINE:
         return '💥';
      case CODE.FLAG:
      case CODE.FLAG_MINE:
         return '🏳️‍🌈';
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
         return '❓'
      default:
         return code || ''; // 코드가 0이면 빈문자
   }
}


const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);


   const onClickTd = useCallback(() => {
      if(halted){
         return;
      }
      // 칸의 상태별로 동작을 구분
      switch( tableData[rowIndex][cellIndex]) {
         // 클릭 막기
         case CODE.OPENED:
         case CODE.FLAG_MINE:
         case CODE.FLAG:
         case CODE.QUESTION_MINE:
         case CODE.QUESTION:
            return;
         case CODE.NORMAL:
            // Cell을 클릭하면 OPEN_CELL 액션이 dispatch 되면서 좌표가 같이 전달되서
            // Minesweeper 컴포넌트에서 변경을 할 수 있다. 
            dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex});
            return;
         case CODE.MINE:
            dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex});
            return;
         default:
            return;
      }
   }, [tableData[rowIndex][cellIndex], halted]);

   const onRightClickTd = useCallback((e) => {
      // 메뉴 뜨는것을 막는다
      e.preventDefault();
      if(halted){
         return;
      }
      // 보통칸 -> 깃발칸 -> 물음표칸 -> 보통칸 
      switch( tableData[rowIndex][cellIndex]) {
         case CODE.NORMAL:
         case CODE.MINE:
            dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex}); // 깃발을 심는다
            return;
         case CODE.FLAG_MINE:
         case CODE.FLAG:
            dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex}); // 물음표를 표시한다.
            return;
         case CODE.QUESTION_MINE:
         case CODE.QUESTION:
            dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex}); // 보통칸으로 되돌린다
            return;
         default:
            return;
      }

   }, [tableData[rowIndex][cellIndex], halted]);

   return (
   <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
   >{getTdText(tableData[rowIndex][cellIndex])}</td>
   )
};

export default Td;