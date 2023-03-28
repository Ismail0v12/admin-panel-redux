# Как работает `redux`?

1. Redux состоит из трех основных частиц `STATE`,`ACTIONS`, `REDUCERS`
2. `STATE` - глобальное хранилище всех данных, которая имеет приложение
3. `REDUCERS` - это функия которое является и должен быть чистой. Оно в себя принимает два аргумента: `state`, `action`.
   которая принимает текущее состояние приложения и информацию о том, что произошло (action), и возвращает новое
   состояние. Она не изменяет текущее состояние напрямую, а создает новый объект состояния.
4. `ACTIONS` - это функция, которая возвращает объект action с полями {type: `required`, payload: `optional`}.
   Выступают в роли посредника между приложением и reducer'ом. Они представляют информацию о том, что произошло в
   приложении и передают эту информацию reducer'у для обновления состояния.

