import { MOVIE_DELETE} from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {

  let {type, payload} = action

  if (type === MOVIE_DELETE) {
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