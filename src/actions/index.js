import * as actionTypes from "../constants";

//TODO: в App.js mapDispatchToProps содержит нужное количество параметров, перенести параметры по аналогии сюда. () если параметр отсуствует
//TODO: в константах сейчас есть MOVIE_DELETE, заменить его на MOVIE_DELETE_PENDING + MOVIE_DELETE_SUCCESS + MOVIE_DELETE_ERROR и так все кроме init и addTodo
//TODO: обновить "заглушки по всем методам" и создать правильные запросы на сервер в утилсах

export const addTodo = payload => dispatch => {
  //TODO: remove when redux-thunk will work proper anyway
  dispatch({ type: actionTypes.MOVIE_DELETE, payload});
}

export const init = payload => dispatch => {
  //TODO: данный метод будет что то делать при инициализации приложения
  dispatch({ type: actionTypes.MOVIE_DELETE, payload});
}
export const movieGetAll = payload => dispatch => {
  //TODO: добавить в утилс запрос на этот метод
  dispatch({ type: actionTypes.MOVIE_DELETE, payload});

}
export const movieGetById = payload => dispatch => {
  //TODO: добавить в утилс запрос на этот метод
  dispatch({ type: actionTypes.MOVIE_DELETE, payload});

}
export const movieAddNew = payload => dispatch => {
  //TODO: добавить в утилс запрос на этот метод
  dispatch({ type: actionTypes.MOVIE_DELETE, payload});

}
export const movieDelete = payload => dispatch => {
  //TODO: добавить в утилс запрос на этот метод
  dispatch({ type: actionTypes.MOVIE_DELETE, payload});
}

export const movieUpdateExisting = (id, movie) => dispatch => {
  /*
  Пример того как должен выглядеть action в реальных условиях:

  dispatch({ type: "MOVIE_UPDATE_EXISTING_PENDING", id, movie});
  utils.updateExistingMovie(id, movie).then(result =>
      dispatch({ type: "MOVIE_UPDATE_EXISTING_SUCCESS", movie:result});
  ).catch(error =>
    dispatch({ type: "MOVIE_UPDATE_EXISTING_SUCCESS", error});
  )
   */
  dispatch({ type: actionTypes.MOVIE_UPDATE_EXISTING, id, movie});
}
