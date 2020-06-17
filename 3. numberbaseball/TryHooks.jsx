import React, { memo, useState } from 'react';

const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <em>{ tryInfo.try }</em>
            <span>{ tryInfo.result }</span>
        </li>
    )
});

// 자식 Component에서 부모 Component에게 물려받은 props의 값을 변경하고 싶을 때
// tryInfo.try = 'hello'; -> 직접 값을 바꿀 수 없다. 
// 부모 컴포넌트한테 받은 props를 state로 만든 후에 그 state를 변경해야 부모 컴포넌트에 영향을 주지 않는다.
/* 
const Try = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);
    const onClickResult = () => {
        setResult('ok');
    }
    return (
        <li>
            <em>{ tryInfo.try }</em>
            <span onClick={onClickResult}>{ result }</span>
        </li>
    )
});
*/


export default Try;