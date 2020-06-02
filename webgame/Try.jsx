import React from 'react';


const Try = ({ tryInfo }) => {
    // props 또는 {tryInfo}
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}

export default Try;