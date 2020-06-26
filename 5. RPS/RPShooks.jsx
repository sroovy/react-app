import React, { useState, useRef, useEffect } from 'react'

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

const RPS = () => {
    const[computerChoice, setComputerChoice] = useState('rock');
    const[result, setResult] = useState( '❓❓❓');
    const[score, setScore] = useState(0);
    const interval = useRef();


    const changeHand = () => {
        if(computerChoice === 'rock'){
            setComputerChoice('scissors');
        } else if(computerChoice === 'scissors'){
            setComputerChoice('paper');
        } else if(computerChoice === 'paper'){
            setComputerChoice('rock');
        } 
    }

    useEffect(() => {
        interval.current = setInterval(changeHand, 200);
        return () => {
            clearInterval(interval.current);
        }
    }, [computerChoice]);

    const onClickButton = (userChoice) => () => {
        clearInterval(interval.current);
        const myScore = scores[userChoice];
        const comScore = scores[computerChoice];
        const scoreCount = myScore - comScore;

        if(scoreCount === 0){
            setResult('DRAW😌');
        } else if([1, -2].includes(scoreCount)){
            setResult('You win!');
            setScore((prevScore) =>prevScore + 1);
        } else{
            setResult('You Lose!');
            setScore((prevScore) =>prevScore - 1);
        }

        console.log(computerChoice)

        setTimeout(() => {
            interval.current = setInterval(changeHand, 200);
        }, 500)
    }


    return (
        <div id="RPS">
            <div id="computer" style={{backgroundPosition : `${rspCoords[computerChoice]} center`}}></div>
            <div className="result">{result}</div>
            <div>
                <button id="rock" className="button" onClick={onClickButton('rock')}>rock</button>
                <button id="scissors" className="button" onClick={onClickButton('scissors')}>scissors</button>
                <button id="paper" className="button" onClick={onClickButton('paper')}>paper</button>
            </div>
            <div className="score">점수 : {score}</div>
        </div>
    )
}

export default RPS;

