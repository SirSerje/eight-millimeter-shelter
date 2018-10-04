import {MOVIE_GET_ALL, MOVIE_GET_ALL_ERROR} from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {
  let {type, payload} = action
  let {movie} = action

  //FIXME: temporary hack when backend is not available
  if (type === MOVIE_GET_ALL_ERROR) {
    return movie.movie
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
