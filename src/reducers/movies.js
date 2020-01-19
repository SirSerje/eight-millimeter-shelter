import * as constants from '../constants/index';

const movies = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.MOVIE_DELETE_SUCCESS:
      const { [payload]: remove, ...rest } = state;
      return { ...rest };

    case constants.MOVIE_ADD_NEW_SUCCESS:
      return { ...state, ...{ [payload.message.id]: payload.message } };

    // TODO: sorting displaying data should handle only by view component
    case constants.SORT_TITLE_DOWN:
    case constants.SORT_TITLE_UP:
      return { ...state };

    case constants.SEARCH_BY_ACTOR_SUCCESS:
    case constants.SEARCH_BY_NAME_SUCCESS:
      return payload.message.reduce((acc, item) => {
        const some = { [item.id]: item };
        return { ...acc, ...some };
      }, {});

    case constants.MOVIE_GET_ALL_SUCCESS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default movies;
