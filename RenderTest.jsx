import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0
    };

    // 렌더링 조건을 정해준다. 

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter){
    //         return true; // do render
    //     }
    //     return false; // don't render
    // }

    onClick = () => {
        this.setState({});
    };

    // state나 props가 바뀌지 않아도 
    // setState만 호출하면 rendering이 일어난다. 

    render() {
        console.log('rendering', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    };
};

export default Test;