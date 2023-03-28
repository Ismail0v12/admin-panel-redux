import {createStore, compose, applyMiddleware} from 'redux';
import ReduxThunk from "redux-thunk";
import filtersReducer from "../reducers/filters.reducer";
import heroesReducer from "../reducers/heroes.reducer";
import {combineReducers} from "@reduxjs/toolkit";

// Reducers можно разделить на несколько частей и комбинировать их в одно
// с помошью функции combineReducers() из пакета redux,
// в эту функию нужно передать обьект combineReducers({reducer})


// const enhancer = (createStore) => (...args) => {
// 	const store = createStore(...args);
// 	const oldDispatch = store.dispatch;
// 	store.dispatch = (action) => {
// 		if (typeof action === "string") {
// 			oldDispatch({
// 				type: action
// 			})
// 		}
// 		oldDispatch(action)
// 	}
//
// 	return store;
// }

const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === "string") {
		return dispatch({
			type: action
		})
	}
	return dispatch(action);
}


const store = createStore(combineReducers(
		{
			filters: filtersReducer,
			heroes: heroesReducer
		}
	),
	compose(
		applyMiddleware(ReduxThunk, stringMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
