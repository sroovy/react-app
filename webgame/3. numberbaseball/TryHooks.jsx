import React, { PureComponent, memo } from 'react';

const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <em>{ tryInfo.try }</em><span>{ tryInfo.result }</span>
        </li>
    )
});


export default Try;