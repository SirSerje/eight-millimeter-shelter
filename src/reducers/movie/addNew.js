import {
  MOVIE_ADD_NEW,
  MOVIE_ADD_NEW_ERROR,
  MOVIE_ADD_NEW_SUCCESS,
} from "../../constants";

const initialState = {movies: []}

const movies = (state = initialState, action) => {
  let {type, payload} = action
  let {movie} = action

  if (type === MOVIE_ADD_NEW_ERROR) {
    return action.error
  }

  if (type === MOVIE_ADD_NEW_SUCCESS) {
    return {...state, movie:movie.movie}
  }

  if (type === MOVIE_ADD_NEW) {
    console.log('reducer MOVIE_ADD_NEW:', action)
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
