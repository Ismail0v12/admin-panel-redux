# Что такое `redux`?

1. Redux состоит из трех основных частиц `STATE`,`ACTIONS`, `REDUCERS`
2. `STATE` - глобальное хранилище всех данных, которая имеет приложение
3. `REDUCERS` - это функия которое является и должен быть чистой. Оно в себя принимает два аргумента: `state`, `action`.
   которая принимает текущее состояние приложения и информацию о том, что произошло (action), и возвращает новое
   состояние. Она не изменяет текущее состояние напрямую, а создает новый объект состояния.
4. `ACTIONS` - это функция, которая возвращает объект action с полями {type: `required`, payload: `optional`}.
   Выступают в роли посредника между приложением и `reducer`'ом. Они представляют информацию о том, что произошло в
   приложении и передают эту информацию `reducer`'у для обновления состояния.
5. `DISPATCH` - это функция, которое передает `ACTION` к `REDUCER`у и `REDUCER` обрабатывает этот `ACTION` исходя
   из `type`

# Функциональность которое имеет `redux`

1. Разделение `REDUCERS` на мелких частиц и комбинирование `REDUCERS` с помошью функции `combineReducers` 
и качестве аргумента принимает объект
```javascript
import {combineReducers} from "@reduxjs/toolkit";
import reducers from "path-to-your-reducers";

const store = createStore(combineReducers({reducers}));

export default store;
```
2. Разделение `ACTIONS` на мелких частиц.
3. И еще много о котором я не знаю :)

# `connect`

`Connect` в `Redux` - это функция, которая позволяет связать компонент `React` с `Redux` store и получить доступ к его
состоянию и методам `dispatch`. Она принимает два аргумента: `mapStateToProps` и `mapDispatchToProps`.

`mapStateToProps` - это функция, которая принимает текущее состояние store в качестве аргумента и возвращает объект,
содержащий данные, которые компонент должен использовать. Например:

```javascript
function mapStateToProps(state) {
   return {
      tasks: state.tasks
   };
}
```

`mapDispatchToProps` - это функция, которая возвращает объект, содержащий функции-обработчики действий, которые компонент
должен использовать для отправки действий в store. 

```javascript
function mapDispatchToProps(dispatch) {
  return {
    addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task })
  };
}
```
С помошью функции `bindActionCreators` можно комбинировать несколько
`actions`, так как это функция возращает объект:

```javascript
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
```
```javascript
import { connect } from 'react-redux';

function TaskList(props) {
  // ...
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
```
Можно даже не создавать функцию, а просто передать `actions` к функцию `connect` вторым аргументом, сама функция `connect`
сделает все за нас:

```javascript
import { connect } from 'react-redux';

function TaskList(props) {
  // ...
}

export default connect(mapStateToProps, actions)(TaskList);
```
# `bindActionCreators`

Функция `bindActionCreators` в Redux позволяет автоматически связать действия (`actions`) и функцию `dispatch`, чтобы
упростить процесс отправки действий в `store`. Она принимает объект с функциями-действиями (`action creators`) и функцию
`dispatch` в качестве аргументов и возвращает новый объект, содержащий те же функции-действия, но каждая из них
автоматически вызывает функцию dispatch, когда она вызывается. Она используються с функией `connect`.

```javascript
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
```

# `useSelector`

useSelector - это хук (`hook`) библиотеки `React Redux`, который позволяет выбирать и получать часть состояния (`state`) из
`Redux` store в компоненте `React`. Он позволяет получить доступ к выбранной части состояния и подписаться на его изменения.
Пример:
````javascript

import { useSelector } from 'react-redux';

function TaskList() {
  const tasks = useSelector(state => state.tasks);

  // ...
}
````
В этом примере функция `useSelector` принимает функцию-селектор, которая выбирает и возвращает список задач из состояния 
`store`. После этого список задач будет доступен в компоненте через переменную `tasks`.

Кроме того, хук `useSelector` автоматически подписывается на изменения выбранной части состояния и вызывает перерендер
компонента, если состояние изменилось. Это позволяет обновлять компонент автоматически при изменении состояния в store.


# Различия между хуком `useSelector` и функцией(`HOC`) `connect`
Хук useSelector и функция connect выполняют похожую функцию, но есть некоторые различия:

1. Синтаксис: `useSelector` - это хук функционального компонента, который использует функцию-селектор, чтобы выбрать часть состояния из Redux store. `connect`, с другой стороны, - это функция высшего порядка (HOC), которая оборачивает классовый компонент и передает ему состояние и действия из Redux store в виде свойств.
2. Использование: `useSelector` часто используется в функциональных компонентах, тогда как `connect` - в классовых компонентах. Хотя `connect` также может быть использован в функциональных компонентах при использовании HOC.
3. Гибкость: `useSelector` более гибок, так как позволяет более просто выбирать только необходимые части состояния. С другой стороны, `connect` более гибкий, так как позволяет передавать дополнительные свойства в компонент и использовать функции-обработчики действий.
4. Подписка: `useSelector` автоматически подписывается на изменения выбранной части состояния и вызывает перерендер компонента, если состояние изменилось. В то время как `connect` подписывается на изменения всего состояния и вызывает перерендер компонента, даже если нужная часть состояния не изменилась.
5. Нагрузка: `useSelector` может быть более эффективным в отношении производительности, так как позволяет избежать ненужного повторного рендеринга компонента при изменении других частей состояния, которые не используются в компоненте. `connect` может быть менее эффективным, так как передает весь объект состояния в компонент.

# `Enhancers`
`Enhancers` - с помощью его можно изменить вес `store`
```javascript
const enhancer = (createStore) => (...args) => {
	const store = createStore(...args);
	const oldDispatch = store.dispatch;
	store.dispatch = (action) => {
		if (typeof action === "string") {
			oldDispatch({
				type: action
			})
		}
		oldDispatch(action)
	}

	return store;
}
```

# `Middleware`
`Middlewa` - с помощью его можно изменить функцию `dispatch`
```javascript
const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === "string") {
		return dispatch({
			type: action
		})
	}
	return dispatch(action);
}
```
