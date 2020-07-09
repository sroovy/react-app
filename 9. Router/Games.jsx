import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';


const Games = () => {
    return (
        <BrowserRouter>
            <div>
                <Route path="/number-baseball" component={NumberBaseballHooks}/>
                <Route path="/rock-scissors-paper" component={RPShooks}/>
                <Route path="/lottery" component={LottoHooks}/>
            </div>
        </BrowserRouter>
    )
}

export default Games;