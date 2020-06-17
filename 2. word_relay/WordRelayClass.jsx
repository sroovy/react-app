const React = require('react');
const { Component } = React;

class WordRelay extends Component {
   state = {
      word: '리액트',
      value: '',
      result: ''
   }

   onSubmitForm = (e) => {
      e.preventDefault();
      if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
         this.setState({
            word: this.state.value,
            value: '',
            result: '딩동댕'
         });
         this.input.focus();
      } else {
         this.setState({
            value: '',
            result: '땡'
         });
         this.input.focus();
      }
   }

   // 입력값을 가져오는 함수
   onChangeValue = (e) => {
      this.setState({
         value: e.target.value
      });
   };

   input;

   onRefInput = (c) => {
      this.input = c;
   }

   render () {
      return (
         <div id="wordRelay">
            <div className="word">{this.state.word}</div>
            <form onSubmit={this.onSubmitForm}>
               <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeValue} />
               <button type="submit">입력</button>
            </form>
            <div className="result" style={this.state.result === '땡' ? {color: 'crimson'} : {color: 'seagreen'}}>{this.state.result}</div>
         </div>
      )
   }
}

module.exports = WordRelay;

