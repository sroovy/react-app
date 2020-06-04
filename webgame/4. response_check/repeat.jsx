import React, { Component } from 'react';

class Response extends Component {
    
    state = {
        state: 'wating',
        message : '클릭해서 시작하세요',
        result: [],
    }

    onClick = () => {
        if(this.state.state === 'waiting'){
            this.setState({
                state: 'now',
                message: '지금 클릭'
            })
        }
    }

    render() {
        return (
            <div id="responseCheck">
                <div id="screen" className={} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </div>
        )
    }
}

export default Response;