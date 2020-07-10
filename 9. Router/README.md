# 9. Router 

## 1. install
* react router dom 설치
> npm i react-router-dom

## 2. 라우터 적용
* BrowserRouter 또는 HashRouter를 불러와 감싸준다.
* **BrowserRouter**
    * http://localhost:8080/number-baseball에서 새로고침을 하면 Cannot GET /number-baseball 에러가 뜬다 → 실제로는 페이지가 여러개 있지 않다는 증거
    * 새로 고침을 하거나 주소창에 주소를 입력하는 것은 서버쪽에 요청을 보내는 일이다. 서버에서는 응답하지 않기 때문에 서버쪽에서 페이지가 존재한다는 사실을 인식하기 위한 추가적인 세팅이 필요하다. 
    * 서버쪽 세팅을 했다는 전제하에 검색엔진이 인식한다. (SEO)
* **HashRouter**
    * http://localhost:8080/#/ : 주소창에  #(해쉬)가 들어있다.
    * 장점 : 새로고침을 해도 에러가 나지 않는다. # 뒤에 부분은 브라우저만 인식하는 부분. 서버는 인식하지 못한다. 
    * 단점 : 서버가 인식하지 못하기 때문에 SEO(검색엔진최적화)에 좋지 않다. (검색엔진은 서버에 요청한다.) 
```javascript
import { BrowserRouter, HashRouter } from 'react-router-dom';

const Games = () => {
    return (
        <BrowserRouter>
            ...
        </BrowserRouter>
    )
}
// 또는
ReactDom.render(<BrowserRouter><Hot /></BrowserRouter>, document.querySelector("#root"));

```

## 3. Route
* 라우트로 사용 할 페이지 컴포넌트를 만든다. 
* 가상의 페이지 주소에 각각 컴포넌트를 연결한다. 

> <Route path="주소규칙" component={연결할 컴포넌트}>
```javascript
import NumberBaseball from '../3. numberbaseball/NumberBaseballHooks';
import RPS from '../5. RPS/RPShooks';
import Lotto from '../6. Lotto/LottoHooks';

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

## 4. Link
* 클릭하면 다른 주소로 이동시킨다. 
* a태그와 비슷한 기능을 하지만, 다른 페이지로 이동시키는게 아니라 Route 부분을 불러주는 역할을 한다. 
```javascript 
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
```

## 5. params
* 페이지 주소를 정의 할 때, 유동적인 값을 전달해야 할 때 사용
* **dynamic router matching** : 라우트가 양이 방대해질때 효율적으로 라우트 갯수를 관리할 수 있다. 
* Game Component
```javascript
<Route path="/game/:name" component={GameMatcher}/>
```

## 5. 쿼리스트링
* 주소에 데이터를 전달하는 가장 쉬운 방법
* 주소에 대한 부가적인 데이터들의 전달을 서버도 인식한다. 
* 쿼리스트링에 대한 정보는 location의 search부분에 저장되어 있다. 
* 주로 게시판 구현할때 새로고침을 했을 때 
* 리액트라우터에서는 쿼리스트링을 해석하는걸 제공하지 않기 때문에 **URLSearchParams**을 사용하는 것이 좋다. 


## 6. withRouter HoC
* 라우트가 아닌 컴포넌트에서 라우터에서 사용하는 객체 - location, match, history 를 사용하려면, withRouter 라는 HoC 를 사용해야 한다. 
```javascript
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class GameMatcher extends Component {
    render() {
        return (
            <div>GameMatcher</div>
        )
    }
}
export default withRouter(GameMatcher);
```

* **history** : 앞으로 가기 뒤로가기 내역이 저장되어있다. 
프로그래밍적으로 부를 수 있다. goBack, push 등등

* **match** :
pararams에 연결된 주소 정보로 분기 처리할 때 사용할 수 있다.  
this.props.match.params.name === '???'

* **location** : 주소, search, hatch 

* GameMatcher Component
```javascript
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
```

## 7. Switch
* 첫번째로 일치하는 것만 렌더링 된다. 
* 상위 주소와 하위 주소가 있는 경우 상위 주소도 일치한걸로 인식한다. 
* **exact** 정확하게 주소가 일치하는 것만 연결 
 <Route exact path="/game/number-baseball" render={(props) => <GameMatcher {...props}/>}/>

```javascript
<Switch>
    <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
</Switch>
```


### Games에서 GameMatcher로 props넘기기
* component
```javascript
<Route path="/game/:name" component={() => <GameMatcher props="value" /> }/>
```
* render **
```javascript
<Route path="/game/:name" render={(props) => <GameMatcher props={props.abc} /> }/>
```


