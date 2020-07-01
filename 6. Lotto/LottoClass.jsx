import React, { Component } from 'react';
import Balls from './BallsClass';

const getWinNumbers = () => {
   console.log('getWinNumbers'); // 계산량이 많은 함수 -> 반복 실행 체크
   const candidate = Array(45).fill().map((v, i) => i + 1);
   const shuffle = [];
   while (candidate.length > 0) {
       shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
   }
   const bonusNumber = shuffle[shuffle.length - 1];
   const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

   return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
   state = {
      winNumbers: getWinNumbers(), // 숫자를 미리 뽑아둔다. 
      winBalls: [], // 당첨 공
      bonus: null, // 보너스 공
      redo : false // reset
   };

   timeouts = [];

   
   lotteryBalls = () => {
      const { winNumbers } = this.state;
      for(let i = 0; i < winNumbers.length - 1; i++){
         this.timeouts[i] = setTimeout(() => {
            this.setState((prevState) => {
               return {
                  winBalls: [...prevState.winBalls, winNumbers[i]]
               }
            })
         }, 1000 * (i + 1));
      }
      this.timeouts[6] = setTimeout(() => {
         this.setState({
            bonus : winNumbers[6],
            redo: true,
         })
      }, 7000);
   }

   componentDidMount() {
      this.lotteryBalls();
   }

   // winBalls의 개수가 0일때 실행되는 부분 
   componentDidUpdate(prevProps, prevState) {
      if(this.timeouts.length === 0){
         this.lotteryBalls();
      }
   }

   componentWillUnmount() {
      this.timeouts.forEach((v) => {
         clearTimeout(v);
      });
   }

   onClickRedo = () => {
      this.setState({
         winNumbers: getWinNumbers(), 
         winBalls: [],
         bonus: null,
         redo : false
      });
      this.timeouts = [];
   }

   render() {
      const { winBalls, bonus, redo } = this.state;
      console.log('winNumbers',this.state.winNumbers);
      console.log(winBalls);
      return (
         <div id="Lotto">
            <div id="numbers">당첨 숫자</div>
            <div id="result">
               {winBalls.map((v) => <Balls key={v} number={v} />)}
            </div>
            <div id="bonus">보너스</div>
               { bonus && <Balls number={bonus} />}
               { redo ? <button className="redo" onClick={this.onClickRedo}>한번 더!</button> : null}
         </div>
      )
   }
}


export default Lotto;

























// function getWinNumbers() {
//    console.log('getWinNumbers'); // 반복실행 확인
//    const candidate = Array(45).fill().map((v, i) => i + 1);
//    const shuffle = [];
//    while (candidate.length > 0) {
//       shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
//    }
//       const bonusNumber = shuffle[shuffle.length - 1];
//       const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
//       return [...winNumbers, bonusNumber];
// };

// class Lotto extends Component {
//    state = {
//       winNumbers: getWinNumbers(), //당첨 숫자들  
//       winBalls: [], 
//       bonus: null, // 보너스 공
//       redo: false,
//    };

//    timeouts = [];

//    runTimeouts = () => {
//       console.log("runTimeouts");
//       const { winNumbers } = this.state; 
//       for(let i = 0; i < winNumbers.length -1; i++){
//          this.timeouts[i] = setTimeout(() => {
//             this.setState((prevState) => {
//                return {
//                   winBalls: [...prevState.winBalls, winNumbers[i]]
//                };
//             });
//          }, (i + 1) * 1000);
//       }
//       this.timeouts[6] = setTimeout(() => {
//          this.setState({
//             bonus: winNumbers[6],
//             redo: true // 한 번 더 버튼이 보이게 된다. 
//          });
//       }, 7000); 
//    }

//    componentDidMount () {
//       console.log('DidMount');
//       this.runTimeouts();
//    }

//    // prevState와 this.state를 비교해서 어떤 상황에 업데이트를 
//    // 실행할것인지 정해준다. 
//    componentDidUpdate (prevProps, prevState) {
//       console.log('DidUpdate');
//       if (this.state.winBalls.length === 0) {
//          this.runTimeouts();
//       }
//    }

//    componentWillUnmount () {
//       console.log('WillUnmount');
//       this.timeouts.forEach((v) => {
//          clearTimeout(v);
//       });
//    }

//    // 초기화
//    onClickRedo = () => {
//       console.log('onClickRedo');
//       this.setState({
//          winNumbers: getWinNumbers(), 
//          winBalls: [], 
//          bonus: null, 
//          redo: false,
//       });
//       this.timeouts = [];

//    }

//    render() {
//       const { winBalls, bonus, redo } = this.state;
//       return (
//          <div id="Lotto">
//             <div id="numbers">당첨 숫자</div>
//             <div id="result">
//                {winBalls.map((v) => <Ball key={v} number={v} />)}
//             </div>
//             <div id="bonus">보너스!</div>
//             {bonus && <Ball number={bonus} />}
//             {redo && <button className="redo" onClick={this.onClickRedo}>한 번 더!</button>}
//          </div>
//       );
//    }
// }