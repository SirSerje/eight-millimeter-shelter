import { MOVIE_GET_BY_ID } from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {

  let {type, payload} = action

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