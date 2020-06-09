# 01. LikeButton 👍



## 1. React, ReactDOM script
* react : view를 만들기 위한 라이브러리
* react DOM : UI를 실제로 브라우저에 렌더링 할 때 사용하는 라이브러리, 화면에 실제로 반영

## 2. root
* 하위에 컴포넌트들을 렌더링 할 수 있는 root가 필요하다
* root안에 들어가는 모든 엘리먼트를 React DOM에서 관리한다. 
```html
<div id=#root></div>
```

## 3. React.createElement
* JSX 없이 React를 사용할 수 있다.
* HTML 태그 생성해 준다.
```javascript
const e = React.createElement;
```
## 4. class Component
* react안에 들어있는 Component를 상속
* **state** : 바뀔 여지가 있는 부분. 상태에 따라 화면이 바뀐다 → data와 화면을 일치시켜준다. 
```javascript
 class LikeButton extends React.Component {
   constructor(props) {
      super(props)
      //state 작성
   }

   render () { //화면 표시 결정
      return
   }
}
```
## 5. ReactDOM render
* React 엘리먼트를 container DOM에 렌더링하고 컴포넌트에 대한 참조를 반환
```javascript
ReactDOM.render(element, container[, callback])
```

## 6. LIke button
1.  React.createElement 
* **props** : HTML 속성(camelCase로 작성)입력. → 객체 형식으로 표현
```javaScript
React.createElement(component, props, ...children)
```
```JavaScript
const e = React.createElement;

Class LikeButton extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         liked: false
      }
   }
   render () { 
      return 
         e('button',  
         { onClick: () => { this.setState({ liked: true })}, type: 'submit'},  
         this.state === true ? 'Liked' : 'Like');
      }
   }

<script>
   ReactDOM.render(e(LikeButton), document.querySelector('#root'));
</script>
```

2. **JSX**(JS + XML)

* 자바스크립트에서 html 태그를 사용 할 수 없다 → babel 사용
* **babel** : 최신 사양의 자바스크립트 코드를 IE나 구형 브라우저에서도 동작하는 ES5 이하의 코드로 변환해준다. 
JSX -> createElement 문법으로 바꿔준다. 
* babel CDN 추가
```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

```
```JavaScript
<script type="text/babel"> 
   class LikeButton extends React.Component {
      constructor(props) {
         super(props)
         this.state = {
            liked: false
         }
      }

      render () { 
         return (
            <button type='submit' 
               onClick={ () => { this.setState({ liked: true })}}>
               {this.state.liked? 'Liked' : 'Like'}
            </button>
         )
      }
   }
</script>

<script type="text/babel">
   ReactDOM.render(<LikeButton />, document.querySelector('#root'));
</script>
```


## 7. Component의 재사용성
* 수정사항이 있을 경우 LikeButton Component만 수정하면 된다. 
```javascript
ReactDOM.render(
   <div>
      <button onClick={onclick}>Like</button>
      <button onClick={onclick}>Like</button>
      <button onClick={onclick}>Like</button>
   </div>, document.querySelector('#root'));
```
```javascript
ReactDOM.render(
   <div>
      <LikeButton />
      <LikeButton />
      <LikeButton />
   </div>, document.querySelector('#root'));
```



