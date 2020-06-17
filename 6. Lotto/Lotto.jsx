import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
   console.log('getWinNumber');
   const candidate = Array(45).fill().map((v, i) => i + 1);
   const shuffle = [];
   while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
   }
      const bonusNumber = shuffle[shuffle.length - 1];
      const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
      return [...winNumbers, bonusNumber];
};


const Lotto = () => {
   const lottoNumbers = useMemo(() => getWinNumbers(), []);
   const [winBalls, setWinBalls] = useState([]);
   const [winNumbers, setWinNumbers] = useState(lottoNumbers);
   const [bonus, setBonus] = useState(null);
   const [redo, setRedo] = useState(false);
   const timeouts = useRef([]);

   

   useEffect(() => {
      console.log('useEffect');
      for(let i = 0; i < winNumbers.length -1; i++){
         // timeouts.current 요소로 직접 넣어주기 때문에 timeouts.current가 변하는것은 아니다. 
         timeouts.current[i] = setTimeout(() => {
            setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
         }, (i + 1) * 1000);
      }
      timeouts.current[6] = setTimeout(() => {
         setBonus(winNumbers[6]);
         setRedo(true);
      }, 7000); 
      
      return () => {
         timeouts.current.forEach((v) => {
            clearTimeout(v);
         });
      }
   }, [timeouts.current]);  
   
   
   // inputs가 빈배열이면 componentDidMount랑 같다. 
   // 배열에 요소가 요소가 있으면 componentDidMount + componentDidUpdate



   const onClickRedo = useCallback(() => {
         console.log('onClickRedo');
         console.log(winNumbers);
         setWinNumbers(getWinNumbers());
         setWinBalls([]);
         setBonus(null);
         setRedo(false);
         // 바뀌는 부분 감지 -> useEffect의 inputs로 들어간다. 
         timeouts.current = [];
      }, [winNumbers]); 

   return (
      <div id="Lotto">
         <div id="numbers">당첨 숫자</div>
         <div id="result">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
         </div>
         <div id="bonus">보너스!</div>
         {bonus && <Ball number={bonus} />}
         {redo && <button className="redo" onClick={onClickRedo}>한 번 더!</button>}
      </div>
   );

}

export default Lotto;