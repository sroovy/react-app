import React, { PureComponent } from 'react';

class Try extends PureComponent {
    render () {
        const { tryInfo } = this.props;
        return (
            <li>
                <em>{ tryInfo.try }</em><span>{ tryInfo.result }</span>
            </li>
        )
    }
}

// 부모 component에서 물려 받은 props를 변경하고 싶을 때
/*
class Try extends PureComponent {
    constructor(props){
        super(props);
        // 다른 동작
        this.state = {
            result : this.props.result,
            try : this.props.try
        };
    }

    render () {
        const { tryInfo } = this.props;
        return (
            <li>
                <em>{ tryInfo.try }</em><span>{ tryInfo.result }</span>
            </li>
        )
    }
}
*/

export default Try;