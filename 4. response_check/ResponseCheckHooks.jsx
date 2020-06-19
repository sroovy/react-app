import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('⚡️ Click anywhere to start ⚡️');
    const [result, setResult] = useState([]);
    const timer = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage('Wait for green 🍀');
            timer.current = setTimeout(() => {
                setState('now');
                setMessage('Click! 👌');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 9) + 2000);
        } else if (state === 'ready'){
            clearTimeout(timer.current);
            setMessage('Too soon 🙅‍♀️');
            setTimeout(() => {
                setState('waiting');
                setMessage('⚡️ Click anywhere to start ⚡️');
            }, 1000);
        } else if (state === 'now'){
            endTime.current = new Date();
            setState('waiting');
            setMessage('⚡️ Click anywhere to start ⚡️');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]
            });
        }
    }
    const getAverage = () => {
        return result.length === 0 
        ? null 
        : <div className="average"> average : {result.reduce((a, c) => a + c) / result.length}ms </div>
        
    }
    return (
        <div id="responseCheck">
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
                {getAverage()}
            </div>
        </div>
    )
}


export default ResponseCheck;