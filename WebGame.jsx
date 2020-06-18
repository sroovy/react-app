import React, { Component } from 'react';
import { useState, useRef } from 'react';
import GuGuDan from './1. gugudan/GuGuDanHooks';
import WordRelay from './2. word_relay/WordRelay';
import NumberBaseball from './3. numberbaseball/NumberBaseballHooks';
import ResponseCheck from './4. response_check/ResponseCheckClass';
import RPS from './5. RPS/RPS';
import Lotto from './6. Lotto/Lotto';
import TicTacToe from './7. TicTacToe/TicTacToe';


class WebGame extends Component {
    

    render() {
        return (
            <div id="webGame">
                <ResponseCheck />
            </div>
        )
    }

}


export default WebGame;


