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
