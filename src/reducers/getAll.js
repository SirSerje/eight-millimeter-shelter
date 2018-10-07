import * as constants from "../constants/index";

const initialState = {movie: []}

let movies = (state = initialState, action) => {
  let {type, payload} = action
  let {movie} = action

  switch (type) {
    case constants.MOVIE_DELETE_SUCCESS:
      let arr = state.movie;
      let b = arr.findIndex(i => Number(i.id) === Number(payload))
      state.movie.splice(b, 1)
      return {...state}

    case constants.MOVIE_ADD_NEW_ERROR:
      return action.error

    case constants.MOVIE_ADD_NEW_SUCCESS:
      state.movie.push(payload.message)
      return {...state}

    case constants.SORT_TITLE_DOWN:
      (state.movie).sort((a, b) => a.title < b.title)
      return {...state}

    case constants.SORT_TITLE_UP:
      (state.movie).sort((a, b) => a.title > b.title)
      return {...state}

    case constants.SEARCH_BY_ACTOR_SUCCESS:
    case constants.SEARCH_BY_NAME_SUCCESS:
      state.movie = payload.message
      return {...state}

    case constants.MOVIE_GET_ALL_ERROR:
      return action.error

    case constants.MOVIE_GET_ALL_SUCCESS:
      let result = Object.values(movie);
      return {...state, movie: result}

  }
  return {
    ...state,
  };
}

export default movies
