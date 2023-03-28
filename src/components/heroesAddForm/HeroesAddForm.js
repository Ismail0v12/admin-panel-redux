import {Formik} from "formik";
import {v4 as uuid} from "uuid";
import {useHttp} from "../../hooks/http.hook";
import {useDispatch, useSelector} from "react-redux";
import {heroesAdd} from "../../actions";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
	const filters = useSelector(state => state.filters.filters);
	const {request} = useHttp();
	const dispatch = useDispatch();

	const renderFilters = filters.length !== 0 && filters.map((filter) => (
		filter.value !== "all" ? <option value={filter.value} key={filter.id}>{filter.label}</option> : null
	));
	return (
		<Formik initialValues={{
			name: "",
			description: "",
			element: ""
		}} onSubmit={(values, {resetForm}) => {
			if(values.element.length !== 0) {
				const newObj = {
					id: uuid(),
					...values
				}
				request("http://localhost:3002/heroes", "POST", JSON.stringify(newObj)).then((res) => {
					dispatch(heroesAdd(res));
					resetForm();
				});
			} else {
				alert("Выберите элемент героя!")
			}
		}}>
			{({getFieldProps, handleSubmit}) => (
				<form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
						<input
							required
							type="text"
							name="name"
							className="form-control"
							id="name"
							placeholder="Как меня зовут?" {...getFieldProps("name")}/>
					</div>

					<div className="mb-3">
						<label htmlFor="text" className="form-label fs-4">Описание</label>
						<textarea
							required
							name="text"
							className="form-control"
							id="text"
							placeholder="Что я умею?"
							style={{"height": '130px'}}
							{...getFieldProps("description")}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
						<select
							{...getFieldProps("element")}
							required
							className="form-select"
							id="element"
							name="element">
							<option>Я владею элементом...</option>
							{renderFilters}
						</select>
					</div>

					<button type="submit" className="btn btn-primary">Создать</button>
				</form>
			)}
		</Formik>
	)
}

export default HeroesAddForm;
