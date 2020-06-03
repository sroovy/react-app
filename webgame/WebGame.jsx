import React, { Component } from 'react';
import { useState, useRef } from 'react';
import GuGuDan from './GuGuDan';
import NumberBaseball from './NumberBaseball';
import WordRelay from './WordRelay';
import Test from './RenderTest';
import ResponseCheck from './ResponseCheck';


class WebGame extends Component {
    

    render() {
        return (
            <div id="webGame">
                <Test />
                <GuGuDan />
                <WordRelay />
                <NumberBaseball />
                <ResponseCheck />
            </div>
        )
    }

}


export default WebGame;


