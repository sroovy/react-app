import React, { Component } from 'react';


const rspCoords = {
    rock : '0',
    scissors : '-245px',
    paper : '-520px'
}

const scores = {
    rock : 0,
    scissors : -1,
    paper : 1
}

class RPS extends Component {
    state = {
        computerChoice : 'rock',
        result : '❓❓❓',
        score : 0
    }

    interval;

    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    changeHand = () => {
        const { computerChoice } = this.state;
        if(computerChoice === 'rock'){
            this.setState({
                computerChoice : 'scissors'
            });
        } else if(computerChoice === 'scissors'){
            this.setState({
                computerChoice : 'paper'
            });
        } else if(computerChoice === 'paper'){
            this.setState({
                computerChoice : 'rock'
            });
        }
    }

    onClickButton(userChoice) {
        const { computerChoice } = this.state;
        clearInterval(this.interval);

        const myScore = scores[userChoice];
        const computerScore = scores[computerChoice];
        const scoreCount = myScore - computerScore;
        
        if(scoreCount === 0){
            this.setState({
                result : 'DRAW😌',
            });
        } else if ([-1, 2].includes(scoreCount)){
            this.setState((prevState) => {
                return {
                    result : 'You Win!😆',
                    score : prevState.score + 1
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    result : 'You Lose!😢',
                    score : prevState.score - 1
                }
            });
        }

        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000)
    }

    render() {
        const { computerChoice, result, score } = this.state;
        return (
            <div id="RPS">
                <div id="computer" style={{backgroundPosition: `${rspCoords[computerChoice]} center`}}></div>
                <div className="result">{result}</div>
                <div>
                    <button id="rock" className="button" onClick={() => this.onClickButton('rock')}>rock</button>
                    <button id="scissors" className="button" onClick={() => this.onClickButton('scissors')}>scissors</button>
                    <button id="paper" className="button" onClick={() => this.onClickButton('paper')}>paper</button>
                </div>
                <div className="score">Score : {score}</div>
            </div>
            
        )
    }
}

export default RPS;