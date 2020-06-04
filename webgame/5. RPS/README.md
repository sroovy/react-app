# ✊🏻🖐🏻✌🏻 5. Rock-paper-scissors

---

<br>

## 1. 실행 방법
1. 가위바위보가 실행된다. 
*-* **setInterval** → 일정한 시간 간격으로 가위, 바위, 보가 차례대로 실행된다. 
2. 가위 바위 보 버튼 중 한 개를 클릭한다.
*-* **clearInterval** → 게임 결과를 산정하는 동안은 가위바위보를 멈춘다.
3. 컴퓨터의 결과와 나의 결과를 비교한다. 
4. 결과 메세지 - 승리, 패배, 무승부
5. 점수 - 승리 1점, 패배 -1점, 무승부 0점 
6. 다시 가위바위보가 실행된다.
*-* **setInterval** → 타이머 재설정 
<br>
---
<br>

## 2. LifeCycle of class
* [State and Lifecycle - React](https://ko.reactjs.org/docs/state-and-lifecycle.html)
* [LifeCycle Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
* Component 클래스에서 특별한 메서드를 선언하여 Component가 Mount 되거나 Unmount 될 때 일부 코드를 작동할 수 있다. 
<br>

### 2-1. componentDidMount
* 컴포넌트 출력물이 DOM에 렌더링 된 후 실행. 
* **비동기 요청**을 하기에 좋은 장소 → 타이머
```javascript
componentDidMount() { 
  this.interval = setInterval(this.changeHand, 500); //타이머 추가 
}
```
<br>

### 2-2 componentDidUpdate
* **리렌더링** 후 실행되는 함수
* 이 시점에선 this.props와 this.state가 바뀌어 있다.
* 파라미터를 통해 이전의 값인 prevProps와 prevState를 조회 할 수 있다.
```javascript
componentDidUpdate(prevProps, prevState) {}
```
<br>

### 2-3 componentWillUnmount
* 컴포넌트가 제거되기 직전
* componentDidMount에서 했던 일을 **제거**
```javascript
componentWillUnmount() { 
	clearInterval(this.interval); // 타이머 제거
}
```
<br>

---
<br>

## 3. useEffect of Hooks
* class의 componentDidMount와 componentDidUpdate, componentWillUnmount가 합쳐진 것
* 리액트 컴포넌트가 **렌더링 이후**에 실행되는 동작을 설정
* 생명주기 메서드에 따라서가 아니라 **코드가 무엇을 하는지**에 따라 나눌 수 있다.
* 여러 번 사용이 가능하다.
* **결합도**가 높은 코드들을 함께 관리할 수 있다. 
* useEffect는 첫번째 렌더링과 이후의 **모든 업데이트**에서 수행된다.
<br>

### 3-1 useEffect의 동작 제거
* effect가 함수를 반환하면 리액트는 그 함수를 정리가 필요한 때에 실행시킨다. → 정리가 필요 없으면 생략 가능
```javascript
useEffect(() => {
  //실행시킬 동작
  return // 제거시킬 동작
})
```
<br>

### 3-2 useEffect의 성능 최적화
* useEffect의 두 번째 인자로 배열을 넘기면 리렌더링시 변경되지 않는 값이 있다면 effect를 건너 뛰도록 할 수 있다.
* 인자로 넘기는 배열은 컴포넌트 범위 내에서 바뀌는 값들과 effect에 의해 사용되는 값들을 모두 포함하는 것이어야 한다.
* []빈배열 : 실행하고 정리하는 과정을 **딱 한번씩만** 실행할 때
→ effect가 prop이나 state의 어떤 값에도 의존하지 않아 재 실행되어야 할 필요가 없음을 전달. 
---
<br>

## 4. Class vs Hooks

### 4-1. Class

```javascript
componentDidMount() { 
  this.interval = setInterval(this.changeHand, 500);
}
```

### 4-2. Hooks

```javascript
useEffect(() => {
  interval.current = setInterval(changeHand, 200);
    return () => { 
      clearInterval(interval.current);
    }
}, [ imgCoord ]); 
```
