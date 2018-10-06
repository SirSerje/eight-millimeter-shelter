import {
  MOVIE_GET_BY_ID,
  MOVIE_GET_BY_ID_ERROR,
  MOVIE_GET_BY_ID_SUCCESS
} from "../../constants";

const initialState = {movies: []}
//FIXME: non refactored
let movies = (state = initialState, action) => {

  let {type, payload} = action
  let {movie} = action

  if (type === MOVIE_GET_BY_ID_ERROR) {
    return action.error
  }

  if (type === MOVIE_GET_BY_ID_SUCCESS) {
    return {...state, movie:movie.movie}
  }

  if (type === MOVIE_GET_BY_ID) {
    console.log('reducer MOVIE_GET_BY_ID:', action)
    const movie = {
      id: 17,
      isComplete: false,
      name: payload,
    }
    return {
      movies: [
        movie
      ]
    };
  }

  return {
    ...state,
    movies
  };
}

export default movies
