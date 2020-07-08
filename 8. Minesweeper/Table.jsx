import React, { useContext, memo } from 'react';
import Tr from './tr';
import { TableContext } from './Minesweeper';

const Table = memo(() => {
    const { tableData } = useContext(TableContext);
   return (
       <table>
           <tbody>
                {Array(tableData.length).fill().map((tr, i) => <Tr key={`row${i}`} rowIndex={i}/>)}
           </tbody>
       </table>
   )
});

export default Table;