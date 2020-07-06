import React, { useReducer } from 'react';
import Table from './Table';

const initialState = {
    tableData: [],
}

const reducer = (state, action) => {
    switch(action.type){
        default :
            return state;
    }
};

const Minesweeper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

   return (
       <Table />
   )
};

export default Minesweeper;