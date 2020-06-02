import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter){
    //         return true; // do render
    //     }
    //     return false; // don't render
    // }

    onClick = () => {
        this.setState({});
    };

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