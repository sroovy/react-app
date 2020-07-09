
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



