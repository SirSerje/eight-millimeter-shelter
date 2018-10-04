import * as actionTypes from "../constants";

export const addTodo = (payload) => {
  console.log('action addTodo')
  return {
    type: actionTypes.AddTodo,
    payload
  }
}

export const init = payload =>{
  console.log('action init')
  return {
    type: actionTypes.APP_INIT,
    payload
  }

}
export const movieGetAll = (payload) => {
  console.log('action movieGetAll')
  return {
    type: actionTypes.MOVIE_GET_ALL,
    payload
  }
}
export const movieGetById = (payload) => {
  console.log('action movieGetById')
  return {
    type: actionTypes.MOVIE_GET_BY_ID,
    payload
  }
}
export const movieAddNew = (payload) => {
  console.log('action movieAddNew')
  return {
    type: actionTypes.MOVIE_ADD_NEW,
    payload
  }
}
export const movieDelete = (payload) => {
  console.log('action movieDelete')
  return {
    type: actionTypes.MOVIE_DELETE,
    payload
  }
}
export const movieUpdateExisting = (id, movie) => {
  console.log('action movieUpdateExisting', id, movie)
  return {
    type: actionTypes.MOVIE_UPDATE_EXISTING,
  }
}
