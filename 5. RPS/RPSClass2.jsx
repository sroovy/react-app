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

const computerChoice = (imgCoords) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoords;
    })[0];
}


class RPS extends Component {
    state = {
        imgCoords : rspCoords.rock,
        result: '❓❓❓',
        score: 0,
    }

    interval; 

    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoords } = this.state;
        if(imgCoords === rspCoords.rock){
            this.setState({
                imgCoords : rspCoords.scissors
            });
        } else if(imgCoords === rspCoords.scissors){
            this.setState({
                imgCoords : rspCoords.paper
            });
        } else if(imgCoords === rspCoords.paper){
            this.setState({
                imgCoords : rspCoords.rock
            });
        }
    };

    onClickButton = (choice) => () => {
        const { imgCoords } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const computerScore = scores[computerChoice(imgCoords)];
        const scoreCount = myScore - computerScore;
        if(scoreCount === 0){
            this.setState({
                result : "DRAW😌"
            });
        } else if([1, -2].includes(scoreCount)) { //scoreCount === 1 || scoreCount === -2
            this.setState((prevState) => {
                return {
                    result : "You Win!😆",
                    score : prevState.score + 1
                }
            });
        } else { 
            this.setState((prevState) => {
                return {
                    result : "You Lose😢",
                    score : prevState.score - 1
                }
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000)
    }


    render () {
        const { result, score, imgCoords } = this.state;
        return (
            <div id="RPS">
                <div id="computer" style={{backgroundPosition : `${imgCoords} center`}}></div>
                <div className="result">{result}</div>
                <div className="buttons">
                    <button id="rock" className="button" onClick={this.onClickButton('rock')}>rock</button>
                    <button id="scissors" className="button" onClick={this.onClickButton('scissors')}>scissors</button>
                    <button id="paper" className="button" onClick={this.onClickButton('paper')}>paper</button>
                </div>
                <div className="score">SCORE : {score}</div>
            </div>
        )
    }
}

export default RPS; 