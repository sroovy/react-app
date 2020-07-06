import React, { useContext } from 'react';
import { TableContext } from './Minesweeper';
import Td from './td';

const Tr = ({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

   return (
       <tr>
           {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td key={`Cell${i}`} rowIndex={rowIndex} cellIndex={i}/>)}
       </tr>
   )
};

export default Tr;