import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import NumberBaseball from '../3. numberbaseball/NumberBaseballHooks';
import RPS from '../5. RPS/RPShooks';
import Lotto from '../6. Lotto/LottoHooks';

const Games = () => {
    return (
        <BrowserRouter>
            {/* 공통인 부분 : 페이지가 바껴도 변하지 않는다.  */}
            <div>
                <Link to ="/number-baseball">숫자야구</Link><br />
                <Link to ="/rock-scissors-paper">가위바위보</Link><br />
                <Link to ="/lottery">로또 생성기</Link>
            </div>
            {/* 화면이 바뀌는 부분 */}
            <div>
                <Route path="/number-baseball" component={NumberBaseball}/>
                <Route path="/rock-scissors-paper" component={RPS}/>
                <Route path="/lottery" component={Lotto}/>
            </div>
        </BrowserRouter>
    )
}

export default Games;