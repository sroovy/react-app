import React, { Component } from 'react';
import NumberBaseball from '../3. numberbaseball/NumberBaseballHooks';
import RPS from '../5. RPS/RPShooks';
import Lotto from '../6. Lotto/LottoHooks';

class GameMatcher extends Component {
    render() {
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('hello'));
        if (this.props.match.params.name === 'number-baseball'){
            return <NumberBaseball />
        } else if(this.props.match.params.name === 'rock-scissors-paper'){
            return <RPS />
        } else if(this.props.match.params.name === 'lottery'){
            return <Lotto />
        }
        return (
            <div>
                일치하는 게임이 없습니다. 
            </div>
        )
    }
}

export default GameMatcher;