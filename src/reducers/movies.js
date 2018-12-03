import { List, Map } from 'immutable';
import * as constants from '../constants/index';

let movies = (state = [], action) => {
  let { type, payload } = action;
  let result = [];

  switch (type) {
    case constants.MOVIE_DELETE_SUCCESS:
      // FIXME
      result = state;
      let b = result.findIndex(i => Number(i.id) === Number(action.payload));
      result.splice(b, 1);
      return List(result);

    case constants.MOVIE_ADD_NEW_SUCCESS:
      //FIXME
      state.push(payload.message);
      result = state;
      return List(result);

    case constants.SORT_TITLE_DOWN:
      //FIXME
      result = state.sort(function(a, b) {
        let nameA = a.title.toLowerCase(),
          nameB = b.title.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      return List(result);

    case constants.SORT_TITLE_UP:
      //FIXME
      result = state.sort(function(a, b) {
        let nameA = a.title.toLowerCase(),
          nameB = b.title.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      return List(result);

    case constants.SEARCH_BY_ACTOR_SUCCESS:
    case constants.SEARCH_BY_NAME_SUCCESS:
      //FIXME
      return payload && payload.message && List(payload.message);

    case constants.MOVIE_GET_ALL_SUCCESS:
      //DONE
      const items = Object.values(payload);
      return List(items).filter(i => i !== null);

    default:
      // return [...state];
      //FIXME
      return Map(...state);
  }
};

export default movies;
