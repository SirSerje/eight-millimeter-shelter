import * as actionTypes from "../constants";

export const addTodo = (payload) => {
  return {
    type: actionTypes.AddTodo,
    payload
  }
}

export const init = (payload) => {
  return {
    type: actionTypes.APP_INIT,
    payload
  }
}
export const movieGetAll = (payload) => {
  return {
    type: actionTypes.MOVIE_GET_ALL,
    payload
  }
}
export const movieGetById = (payload) => {
  return {
    type: actionTypes.MOVIE_GET_BY_ID,
    payload
  }
}
export const movieAddNew = (payload) => {
  return {
    type: actionTypes.MOVIE_ADD_NEW,
    payload
  }
}
export const movieDelete = (payload) => {
  return {
    type: actionTypes.MOVIE_DELETE,
    payload
  }
}
export const movieUpdateExisting = (a,b) => {
  console.log('action called', a,b)
  return {
    type: actionTypes.MOVIE_UPDATE_EXISTING,
    a
  }
}


// export const removeTodo = (id)=> {
//   return {
//     type: removeTodo,
//     id
//   }
// }
//
// export const completeTodo = (id)=> {
//   return {
//     type: completeTodo,
//     id
//   }
// }
