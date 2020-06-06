import React, { Component } from 'react';
import { useState, useRef } from 'react';
import GuGuDan from './1. gugudan/GuGuDan';
import WordRelay from './2. word_relay/WordRelay';
import NumberBaseball from './3. numberbaseball/NumberBaseball';
import ResponseCheck from './4. response_check/ResponseCheck';
import RPS from './5. RPS/RPS';
import Lotto from './6. Lotto/Lotto';
import TicTacToe from './7. TicTacToe/TicTacToe';


class WebGame extends Component {
    

    render() {
        return (
            <div id="webGame">
                {/* <GuGuDan />
                <WordRelay />
                <NumberBaseball />
                <ResponseCheck />
                <RPS />
                <Lotto /> */}
                <TicTacToe />
            </div>
        )
    }

}


export default WebGame;


