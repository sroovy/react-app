import React, { Component } from 'react';

class Try extends Component {
    render () {
        const { tryInfo } = this.props;
        return (
            <li>
                <em>{ tryInfo.try }</em><span>{ tryInfo.result }</span>
            </li>
        )
    }
}

export default Try;