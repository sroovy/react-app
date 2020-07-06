import React, { useContext } from 'react';
import { TableContext, CODE } from './Minesweeper';

const getTdStyle = (code) => {
   switch(code){
      case CODE.NORMAL:
      case CODE.MINE:
         return {
            background: '#666',
            boxShadow: '2px 2px rgba(0, 0, 0, 0.4) inset'
         }
      case CODE.OPENED:   
         return {
            background: '#fff',
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
      default:
         return '';
   }
}

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData } = useContext(TableContext);

   return (
   <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
   >{getTdText(tableData[rowIndex][cellIndex])}</td>
   )
};

export default Td;