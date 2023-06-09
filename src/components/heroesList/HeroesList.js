import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {createSelector} from "reselect";
import {useHttp} from '../../hooks/http.hook';

import {fetchHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import "./heroes.scss";
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	// Функция createSelector() мемоизурует state
	// при этом предотвращая ре-рендеринг компопнента, он сравнивает значение
	const filteredHeroesSelector = createSelector(
		(state) => state.filters.filterByElement,
		(state) => state.heroes.heroes,
		(filter, heroes) => {
			if (filter === "all") {
				return heroes;
			} else {
				return heroes.filter((item) => item.element === filter)
			}
		}
	)

	const filteredHeroes = useSelector(filteredHeroesSelector);
	const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
	const dispatch = useDispatch();
	const {request} = useHttp();

	useEffect(() => {
		dispatch(fetchHeroes(request));
		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner/>;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition
					timeout={500}
					classNames="hero">
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			)
		}

		return arr.map(({id, ...props}) => {
			return (
				<CSSTransition
					key={id}
					timeout={500}
					classNames="hero">
					<HeroesListItem key={id} id={id} {...props} />
				</CSSTransition>
			)
		})
	}


	const elements = renderHeroesList(filteredHeroes);
	return (
		<TransitionGroup component="ul">
			{elements}
		</TransitionGroup>
	)
}

export default HeroesList;
