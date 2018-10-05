import {MOVIE_GET_ALL, MOVIE_GET_ALL_ERROR, MOVIE_GET_ALL_SUCCESS} from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {
  let {type, payload} = action
  let {movie} = action

  if (type === MOVIE_GET_ALL_ERROR) {
    return action.error
  }

  if (type === MOVIE_GET_ALL_SUCCESS) {
    return {...state,movie:movie.movie}
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
