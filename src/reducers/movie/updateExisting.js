import { MOVIE_UPDATE_EXISTING } from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {
  let {type, payload} = action
  if (type === MOVIE_UPDATE_EXISTING) {
    console.log('reducer MOVIE_UPDATE_EXISTING:', action)
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