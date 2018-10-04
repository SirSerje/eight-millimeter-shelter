import { APP_INIT } from "../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {
  let {type, payload} = action
  if (type === APP_INIT) {
    console.log('reducer APP_INIT:', action)
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
    movies
  };
}

export default movies