import {createStore} from 'redux';
import filtersReducer from "../reducers/filters.reducer";
import heroesReducer from "../reducers/heroes.reducer";
import {combineReducers} from "@reduxjs/toolkit";

// Reducers можно разделить на несколько частей и комбинировать их в одно
// с помошью функции combineReducers() из пакета redux,
// в эту функию нужно передать обьект combineReducers({reducer})

const store = createStore(combineReducers({
	filters: filtersReducer,
	heroes: heroesReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
