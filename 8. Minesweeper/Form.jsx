import React, { useState, useCallback, useContext } from 'react';
import { TableContext, START_GAME } from './Minesweeper';

const Form = () => {
   // 초기 설정 : 10*10 칸에 지뢰 20개
   const [row, setRow] = useState(10); 
   const [cell, setCell] = useState(10); 
   const [mine, setMine] = useState(20); 
   const { dispatch } = useContext(TableContext)

   const onChangeRow = useCallback((e) => {
      setRow(e.target.value);
   },[]);

   const onChangeCell = useCallback((e) => {
      setCell(e.target.value);
   },[]);

   const onChangeMine = useCallback((e) => {
      setMine(e.target.value);
   },[]);

   // context API 적용
   const onClickBtn = useCallback((e) => {
      e.preventDefault();
      dispatch({ type: START_GAME, row, cell, mine });
   },[row, cell, mine]);


   return (
      <form>
         <label>row
            <input type="number" placeholder="row" value={row} onChange={onChangeRow} />
         </label>
         <label>cell
            <input type="number" placeholder="cell" value={cell} onChange={onChangeCell} />
         </label>
         <label>mine
            <input type="number" placeholder="mine" value={mine} onChange={onChangeMine} />
         </label>
         <button onClick={onClickBtn}>Start</button>
      </form>
   )
};

export default Form;