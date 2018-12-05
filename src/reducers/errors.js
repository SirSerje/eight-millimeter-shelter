import { List } from 'immutable';
import * as constants from '../constants';

let errors = (state = List(), action) => {
  let { type, payload } = action;
  switch (type) {
    case constants.UPLOAD_ERROR:
    case constants.SEARCH_BY_ACTOR_ERROR:
    case constants.MOVIE_DELETE_ERROR:
    case constants.MOVIE_ADD_NEW_ERROR:
    case constants.MOVIE_GET_ALL_ERROR:
      return state.size > constants.MAX_ERROR_QUANTITY
        ? state.shift().push(payload)
        : state.push(payload);

    default:
      return state;
  }
};

export default errors;
