import * as constants from '../constants';

const errors = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.UPLOAD_ERROR:
    case constants.SEARCH_BY_ACTOR_ERROR:
    case constants.MOVIE_DELETE_ERROR:
    case constants.MOVIE_ADD_NEW_ERROR:
    case constants.MOVIE_GET_ALL_ERROR:
      const error = payload.message || {};
      return { ...state, error };

    default:
      return {};
  }
};

export default errors;
