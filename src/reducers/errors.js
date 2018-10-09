import * as constants from '../constants';

const MAX_ERROR_QUANTITY = 4;

let errors = (state = [], action) => {
  let { type, payload } = action;
  switch (type) {
    case constants.UPLOAD_ERROR:
    case constants.SEARCH_BY_ACTOR_ERROR:
    case constants.MOVIE_DELETE_ERROR:
    case constants.MOVIE_ADD_NEW_ERROR:
    case constants.MOVIE_GET_ALL_ERROR:
      let arr = state;
      if (arr.length > MAX_ERROR_QUANTITY) {
        arr.splice(0, 1);
      }
      return [...arr, payload];

    default:
      return [...state];
  }
};

export default errors;
