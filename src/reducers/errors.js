import { List } from 'immutable';
import * as constants from '../constants';

const errors = (state = List(), action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.UPLOAD_ERROR:
    case constants.SEARCH_BY_ACTOR_ERROR:
    case constants.MOVIE_DELETE_ERROR:
    case constants.MOVIE_ADD_NEW_ERROR:
    case constants.MOVIE_GET_ALL_ERROR:
      state.size > constants.MAX_ERROR_QUANTITY ? state.shift().push(payload) : state.push(payload);
      return state;

    default:
      return state;
  }
};

export default errors;
