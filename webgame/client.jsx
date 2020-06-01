import React from 'react';
import ReactDom from'react-dom';
import { hot } from 'react-hot-loader/root';
// import GuGuDan from './GuGuDan';
// import NumberBaseball from './NumberBaseball';
import WebGame from './WebGame';

const Hot = hot(WebGame);

ReactDom.render(<Hot />, document.querySelector("#root"));