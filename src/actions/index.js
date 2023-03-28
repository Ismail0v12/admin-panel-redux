export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING'
	}
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR'
	}
}

export const fetchHeroes = (request) => (dispatch) => {
	request("http://localhost:3002/heroes")
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}


export const filtersFetching = () => {
	return {
		type: 'FILTERS_FETCHING'
	}
}

export const filtersFetched = (filters) => {
	return {
		type: 'FILTERS_FETCHED',
		payload: filters
	}
}

export const filtersFetchingError = () => {
	return {
		type: 'FILTERS_FETCHING_ERROR'
	}
}

export const heroesDelete = (id) => {
	return {
		type: "HEROES_DELETE",
		payload: id
	}
}

export const heroesAdd = (fields) => {
	return {
		type: "HEROES_ADD",
		payload: fields
	}
}

export const filterHeroes = (element) => {
	return {
		type: "FILTER_HEROES_BY_ELEMENT",
		payload: element
	}
}


export const fetchFilters = (request) => dispatch => {
	request("http://localhost:3002/filters")
		.then((res) => dispatch(filtersFetched(res)))
		.catch(() => dispatch(filtersFetchingError()))
}

// export const filterHeroes = (element) => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch({
// 			type: "FILTER_HEROES_BY_ELEMENT",
// 			payload: element
// 		})
// 	}, 1000);
// }
