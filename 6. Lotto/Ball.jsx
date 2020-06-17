import React, { memo } from 'react';

//state 설정이 필요 없으면 함수형 Component로 만들 수 있다. 
// memo -> class에서 pureComponent의 역할
// HOC(Higher-order Component)
// -> 함수를 통하여 컴포넌트에 우리가 준비한 특정 기능을 부여

const Ball = memo(({number}) => {
   let background;
      if(number <= 10) {
         background = '#fcbdab';
      } else if(number <= 20){
         background = '#94d183';
      } else if(number <= 30){
         background = '#6ebda8';
      } else if(number <= 40){
         background = '#269493';
      } else {
         background = '#20485a';
      }
      return (
      <div className="ball" style={{ background }}>{number}</div>
      )
});


export default Ball;