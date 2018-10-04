import { MOVIE_ADD_NEW } from "../../constants";

const initialState = {movies: []}

const movies = (state = initialState, action) => {

  let {type, payload} = action

  if (type === MOVIE_ADD_NEW) {
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