import React from 'react';
import Tr from './tr';

const Table = ( {tableData, dispatch } ) => {
   return (
      <table>
         {/* 요소가 3개인 배열이 만들어진다 -> 그 배열을 각각 tr로 만듬 */}
         {Array(tableData.length).fill().map((tr, i) => <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />)}
         {/* rowdata = [' ', ' ', ' '] */}
      </table>
   )
};

export default Table;