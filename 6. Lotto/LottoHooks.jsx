import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './BallHooks';

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

// useMemo: 복잡한 함수 리턴 값을 기억
// useCallback : 함수 자체를 기억 
// useRef : 일반 값을 기억
// hooks는 순서가 중요하다 조건문 안에 넣지 않는다. 최상위

// componentDidMount에서는 실행이 안되고 componentDidUpdate에서만 실행시키고 싶을 때
// componentDidMount에서 useEffect는 항상 실행이 되지만 그 때 아무 작업도 하지 않으면 된다. 
/*
const mounted = useRef(false);
useEffect(() => {
   if(!mounted.current) { // 실행은 하지만 아무일도 하지 않는다. 
      mounted.current = true;
   } else {
      //ajax 요청
   }
}, [바뀌는 값]); // 바뀌는 값에 따라 실행
*/

const Lotto = () => {
   const lottoNumbers = useMemo(() => getWinNumbers(), []);
   const [winBalls, setWinBalls] = useState([]);
   const [winNumbers, setWinNumbers] = useState(lottoNumbers);
   const [bonus, setBonus] = useState(null);
   const [redo, setRedo] = useState(false);
   const timeouts = useRef([]);

   
   useEffect(() => {
      for(let i = 0; i < winNumbers.length - 1; i++){
         timeouts.current[i] = setTimeout(() => {
            setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
         }, (i + 1) * 1000);
      }
      timeouts.current[6] = setTimeout(() => {
         setBonus(winNumbers[6]);
         setRedo(true);
      }, 7000);

      return () => {
         timeouts.current.forEach((v) => {clearTimeout(v)});
      }

   }, [timeouts.current]); // inputs가 빈배열이면 componentDidMount랑 같다. 
// 배열에 요소가 요소가 있으면 componentDidMount + componentDidUpdate


   // 장점 : 함수컴포넌트는 전체가 재 실행 되는데, 함수 자체를 기억해 둬서
   // 함수 컴포넌트가 재 실행 되어도 새로 생성되지 않는다. 
   const onClickRedo = useCallback(() => {
      console.log('onClickRedo');
      console.log(winNumbers)
      setWinNumbers(getWinNumbers());
      setWinBalls([]);
      setBonus(null);
      setRedo(false);
      // 바뀌는 부분 감지 -> useEffect의 inputs로 들어간다. 
      timeouts.current = [];
   }, [winNumbers]);
   // 빈배열일 때 : 당첨 숫자가 바껴도 바뀌지가 않는다(첫번째 당첨 숫자만 기억.)




   return (
      <div id="Lotto">
         <div id="numbers">당첨 숫자</div>
         <div id="result">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
         </div>
         <div id="bonus">보너스!</div>
         {bonus && <Ball number={bonus} />}
         {/* useCallback 필수로 적용해야할 때 :  자식 컴포넌트에 함수를 넘길 때 -> useCallback이 없으면 매번 새로운 함수가 생성되는데
         자식 컴포넌트에 매번 새로운 함수를 전달하면 자식 컴포넌트는 부모로 부터 받은 프롭스가 바뀐걸로 인지해서 매번 새로 렌더링한다. 
         */}
         {redo && <button className="redo" onClick={onClickRedo}>한 번 더!</button>}
      </div>
   );

}

export default Lotto;