import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state : 'waiting', //screen의 상태
        message : '⚡️ Click anywhere to start ⚡️',
        result : []
    }

    startTime;
    endTime;
    timer;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if(state === 'waiting'){
            this.setState({
                state : 'ready',
                message: 'Wait for green 🍀'
            });
            this.timer = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: 'Click! 👌'
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
         }
            if (state === 'ready'){ //성급하게 클릭
                clearTimeout(this.timer);
                this.setState({
                    message: 'Too soon 🙅‍♀️'
                });
                setTimeout(() => {
                    this.setState({
                        state: 'waiting',
                        message: '⚡️ Click anywhere to start ⚡️'
                    });
                }, 1000);
        } else if(state === 'now'){ // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '⚡️ Click anywhere to start ⚡️',
                    result : [ ...prevState.result, this.endTime - this.startTime ]
                }
            });
        }
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0 
            ? null 
            : <div className="average"> Average : {result.reduce((a, c) => a + c ) / result.length}ms</div>
        {/* {result.length !== 0 && <div className="average">평균시간 : {result.reduce((a, c) => a + b ) / result.length}ms</div>} */}
    }

    render () {
        const { state, message } = this.state;
        return (
            <div id="responseCheck">
                <div 
                    id="screen" 
                    className={state} 
                    onClick={this.onClickScreen}>{message}
                    <div className="average">{this.renderAverage()}</div>
                </div>
            </div>
        )
    }

}
    


export default ResponseCheck;



























// state = {
//     state: 'wating',
//     message : '클릭해서 시작하세요',
//     result: [],
// }

// onClick = () => {
//     if(this.state.state === 'waiting'){
//         this.setState({
//             state: 'now',
//             message: '지금 클릭'
//         })
//     }
// }

// render() {
//     return (
//         <div id="responseCheck">
//             <div id="screen" className={} onClick={this.onClickScreen}>
//                 {message}
//             </div>
//             {this.renderAverage()}
//         </div>
//     )
// }
// }