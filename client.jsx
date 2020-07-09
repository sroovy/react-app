import React from 'react';
import ReactDom from'react-dom';
import { hot } from 'react-hot-loader/root';
import WebGame from './WebGame';
import Games from './9. Router/Games';

const Hot = hot(Games);

ReactDom.render(<Hot />, document.querySelector("#root"));