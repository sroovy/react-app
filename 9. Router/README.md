
웹과 앱에서 사용 가능하다. 

1. react router 설치
* 기본적인것들만 모여있다. 
> npm i react-router


2. react router dom 설치
* 웹에서 쓰는 라이브러리
> npm i react-router-dom

* 우리가 실제로 사용하는 라이브러리는 react router dom 이고 
react router는 react router dom이 필요로 하는 라이브러리

import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

최상위를 감싸준다

```javascript
const Games = () => {
    return (
        <BrowserRouter>
            
        </BrowserRouter>
    )
}

// 또는 
ReactDom.render(<BrowserRouter><Hot /></BrowserRouter>, document.querySelector("#root"));

```


가상의 페이지 주소를 만들어서 각각 컴포넌트를 연결
```javascript
const Games = () => {
    return (
        <BrowserRouter>
            <Link >
            <div>
                <Route path="/number-baseball" component={NumberBaseballHooks}/>
                <Route path="/rock-scissors-paper" component={RPShooks}/>
                <Route path="/lottery" component={LottoHooks}/>
            </div>
        </BrowserRouter>
    )
}
```

리액트 라우터가 여러개 페이지를 동시에 렌더링을 해준다. 



2. 링크와 브라우저 라우터
** 리액트 라우터는 눈속임이다...
페이지가 여러개 있는것처럼 보이는것. 

a태그와 같은 기능을 하는
Link to 로 연결 
다른 페이지로 넘어가는 게 아니라 Route 부분을 불러주는 역할


http://localhost:8080/number-baseball 에서 새로고침을 하면
Cannot GET /number-baseball 문구가 뜬다 
-> 실제로는 페이지가 여러개 있지 않다는 증거 -> 

새로고침을 하거나 주소창에 주소를 입력하는 것은
서버쪽에 요청을 보내는 일이다. 
따라서 서버에서는 응답 X -> 에러 문구 
서버쪽에서 추가적인 세팅이 필요하다
서버에 페이지가 존재한다는 사실을 알려줘야한다. 

서버쪽 세팅을 했다는 전제 하에 검색엔진이 인식 


프론트엔드인 리액트 라우터만 알고 있다. 
-> client side rendering
** 브라우저 라우터를 사용해도 SEO를 위해 따로 세팅이 필요하다. 

HashRouter
주소창에 http://localhost:8080/#/
#(해쉬)가 들어있다. 

장점 : 새로고침을 해도 화면이 보인다. 
(#) 뒤에 부분은 브라우저만 인식하는 부분. 서버가 인식을 하지 못한다. 

단점 : 서버가 인식하지 못하기 때문에 검색엔진 
SEO(검색엔진최적화) 할때 불이익을 받는다. 
검색엔진이 서버에 요청을 하기 때문
실무에서는 잘 쓰지 않는다. 


라우트가 양이 방대해질때
dynamic router matching 
효율적으로 라우터 갯수를 관리할 수 있다. 


<Route path="/game/:name" component={GameMatcher}/>

:name : 파라미터 params
동적으로 바뀐다. 

라우트 컴포넌트가 게임매처에 props를 넣어준다. 


라우트가 아닌 컴포넌트에서 라우터에서 사용하는 객체 - location, match, history 를 사용하려면, withRouter 라는 HoC 를 사용해야합니다.
undefined 경우 : 

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class GameMatcher extends Component {
    render() {
        console.log(this.props.history, this.props.match)
        return (
            <div>GameMatcher</div>
        )
    }
}

export default withRouter(GameMatcher);