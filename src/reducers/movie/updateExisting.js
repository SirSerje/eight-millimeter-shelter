import { MOVIE_UPDATE_EXISTING} from "../../constants";

const initialState = {movies: []}

let movies = (state = initialState, action) => {
  console.log('reducer MOVIE_UPDATE_EXISTING called 15')

  let {type, payload} = action

  if (type === MOVIE_UPDATE_EXISTING) {
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