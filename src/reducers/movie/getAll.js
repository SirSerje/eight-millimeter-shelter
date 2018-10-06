import {
  MOVIE_ADD_NEW_ERROR,
  MOVIE_ADD_NEW_SUCCESS, MOVIE_DELETE, MOVIE_DELETE_SUCCESS,
  MOVIE_GET_ALL,
  MOVIE_GET_ALL_ERROR,
  MOVIE_GET_ALL_SUCCESS
} from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {
  let {type, payload} = action
  let {movie} = action

  if (type === MOVIE_DELETE_SUCCESS) {
    console.log('MOVIE DELETED', state.movie)
var arr = state.movie

  let b =  arr.findIndex(i => Number(i.id) === Number(action.payload))

    console.log('+!@_#', b)
state.movie.splice(b,1)
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

  if (type === MOVIE_GET_ALL_ERROR) {
    return action.error
  }

  if (type === MOVIE_GET_ALL_SUCCESS) {
    let result = Object.values(movie);
    return {...state, movie:result}
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
