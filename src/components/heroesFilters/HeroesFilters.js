// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {connect} from "react-redux";
import {useEffect} from "react";

import {useHttp} from "../../hooks/http.hook";
import * as actions from "../../actions";
import Spinner from "../spinner/Spinner";
import classnames from "classnames"

const HeroesFilters = ({
	                       filterHeroes,
	                       filtersLoadingStatus,
	                       filters,
	                       filterByElement,
	                       filtersFetched,
	                       filtersFetching,
	                       filtersFetchingError
                       }) => {

	const {request} = useHttp();
	useEffect(() => {
		filtersFetching()
		request("http://localhost:3002/filters").then((res) => filtersFetched(res)).catch(() => filtersFetchingError())

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const filterRender = filters.map((filter) => (
		<button key={filter.id} className={classnames({
			[`${filter.class}`]: true,
			active: filter.value === filterByElement,
		})} name={filter.value}
		        onClick={() => filterHeroes(filter.value)}>{filter.label}</button>
	))


	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{filtersLoadingStatus === "loading" && <Spinner/>}
					{filtersLoadingStatus === "idle" && filterRender}
					{filtersLoadingStatus === "error" && <h6>Не удалос загрузить фильтры</h6>}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	filterByElement: state.filters.filterByElement,
	filters: state.filters.filters,
	filtersLoadingStatus: state.filters.filtersLoadingStatus
});

// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators({filterHeroes}, dispatch)
// }

export default connect(mapStateToProps, actions)(HeroesFilters);
