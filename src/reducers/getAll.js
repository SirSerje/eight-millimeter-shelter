import * as constants from "../constants/index";
// import update from "immutability-helper";

let movies = (state = [], action) => {
  let {type, payload} = action
  let {movie} = action
  let result = []

  switch (type) {
    case constants.MOVIE_DELETE_SUCCESS:
      result = state;
      let b = result.findIndex(i => Number(i.id) === Number(action.payload))
      result.splice(b, 1)
      return [...result]

    case constants.MOVIE_ADD_NEW_SUCCESS:
      state.push(payload.message)
      result = state
      return [...result]

    case constants.SORT_TITLE_DOWN:
      result = (state).sort((first, second) => first.title < second.title)
      return [...result]

    case constants.SORT_TITLE_UP:
      result = (state).sort((first, second) => first.title > second.title)
      return [...result]

    case constants.SEARCH_BY_ACTOR_SUCCESS:
    case constants.SEARCH_BY_NAME_SUCCESS:
      result = payload.message
      return [...result]

    case constants.MOVIE_GET_ALL_SUCCESS:
      let result = Object.values(movie);
      return [...state, ...result]

    case constants.MOVIE_GET_ALL_ERROR:
      return [...state, action.error]

    case constants.MOVIE_ADD_NEW_ERROR:
      return [...state, action.error]

    default:
      return [...state]
  }
}

export default movies
