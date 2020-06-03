import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state : 'wating', //color 담당
        message: '클릭해서 시작하세요.',
        result: []
    }
    
    // 렌더링 X
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state} = this.state;
        if(state === 'wating'){ //color : cornflowerblue
            this.setState({
                state: 'ready', // color: tomato
                message: '초록색이 되면 클릭하세요'
            });
            // 2초 ~ 3초 후에 color change tomato to seagreen
            this.timeout = setTimeout(()=> {
                this.setState({
                    state: 'now', // color: seagreen
                    message: '지금 클릭'
                });
                this.startTime = new Date();
            },Math.floor(Math.random() * 1000) + 2000); // 2초~3초 사이 랜덤
        } else if (state === 'ready'){ // 성급하게 클릭 -> state, 타이머 초기화
            this.setState({ 
                state: 'wating',
                message: '너무 성급하시군요. 초록색이 된 후에 클릭하세요'
            });
            clearTimeout(this.timeout);
        } else  if (state === 'now'){ //반응 속도 체크 -> 초록색이 된 순간부터 클릭할 때까지의 시간
            // 클릭하면 다시 처음으로 돌아간다. 
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'wating',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            });
        }
    }

    onReset = () => {
        this.setState({
            result: []
        });
    };

    renderAverage = () => {
        const { result } = this.state;
        // result.length === 0 
        //     ? null /*  빈 배열이면 평균 시간을 보여주지 않는다.  */
        //     : <>
        //         <div>평균 시간 : {result.reduce((a,c) => a + c) / result.length}ms</div>
        //         <button onClick={this.onReset}>reset</button>
        //     </>

        console.log(result.length)
        result.length !== 0 && <div>평균 시간 : {result.reduce((a,c) => a + c) / result.length}ms</div>
    }
    
    render () {
        const { state, message } = this.state;
        return (
            <>
                <div 
                    id ="screen"
                    className={state}
                    onClick={this.onClickScreen}
                    >
                        {message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

// render 함수 내 return안에서는 for과 if를 쓰지 못한다. (jsx에서 안에서 쓰지않는다.)
// 1. 삼항 조건 연산자 condition ? true : false
// 2. &&
// -> 가독성이 떨어지면 따로 함수로 뺄 수 있다. 
// false, undefined, null은 jsx에서 태그 없음을 의미한다. 

export default ResponseCheck;