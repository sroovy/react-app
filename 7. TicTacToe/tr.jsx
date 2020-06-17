import React, { useMemo, memo } from 'react';
import Td from './td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {

   return (
      <tr>
         {Array(rowData.length).fill().map((td, i) => (
         useMemo( () => 
            <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{' '}</Td>,
            [rowData[i]])
         ))}
      </tr>
   )

});

export default Tr;