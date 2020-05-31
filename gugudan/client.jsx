const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const GuGuDan = require('./GuGuDan');
const Hot = hot(GuGuDan);

ReactDom.render(<Hot />, document.querySelector("#root"));