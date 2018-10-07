import {
  MOVIE_ADD_NEW_ERROR,
  MOVIE_ADD_NEW_SUCCESS,
  MOVIE_DELETE_SUCCESS,
  MOVIE_GET_ALL,
  MOVIE_GET_ALL_ERROR,
  MOVIE_GET_ALL_SUCCESS, SEARCH_BY_ACTOR_SUCCESS, SEARCH_BY_NAME_SUCCESS, SORT_TITLE_DOWN, SORT_TITLE_UP
} from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {
  let {type, payload} = action
  let {movie} = action

  if (type === MOVIE_DELETE_SUCCESS) {
    console.log('MOVIE DELETED', state.movie)
    let arr = state.movie
    let b = arr.findIndex(i => Number(i.id) === Number(action.payload))
    state.movie.splice(b, 1)
    console.log('MOVIE AFTER', state.movie)
    return {...state}
  }

  if (type === MOVIE_ADD_NEW_ERROR) {
    console.log('reducr movie delete error')
    return action.error
  }



  if (type === MOVIE_ADD_NEW_SUCCESS) {
    state.movie.push(action.payload.message)

    return {...state}
  }

  if (type === SORT_TITLE_DOWN ) {
    (state.movie).sort((a,b)=> a.title < b.title)
    return {...state}
  }

  if (type === SORT_TITLE_UP ) {
    (state.movie).sort((a,b)=> a.title > b.title)
    return {...state}
  }

  if (type === SEARCH_BY_ACTOR_SUCCESS || type === SEARCH_BY_NAME_SUCCESS ) {
    state.movie = action.payload.message
    return {...state}
  }

  //TODO: remove if everything okay
  // if (type === SEARCH_BY_NAME_SUCCESS) {
  //   state.movie = action.payload.message
  //   return {...state}
  // }

  if (type === MOVIE_GET_ALL_ERROR) {
    return action.error
  }

  if (type === MOVIE_GET_ALL_SUCCESS) {
    let result = Object.values(movie);
    return {...state, movie: result}
  }

  //----------------------------------------------

  if (type === MOVIE_GET_ALL) {
    const movie = {
      id: 17,
      isComplete: false,
      name: payload,
    }
    return {
      movie: [
        movie.movie
      ]
    };
  }

  return {
    ...state,
    movies
  };
}

export default movies
