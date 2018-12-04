import { List } from 'immutable';
import * as constants from '../constants/index';

let movies = (state = List(), action) => {
  let { type, payload } = action;
  if (!List.isList(state)) state = List(state);

  switch (type) {
    case constants.MOVIE_DELETE_SUCCESS:
      return state.filter(i => i.id !== payload);

    case constants.MOVIE_ADD_NEW_SUCCESS:
      return state.push(payload.message);

    case constants.SORT_TITLE_DOWN:
      return state.sort((a, b) => {
        let nameA = a.title.toLowerCase();
        let nameB = b.title.toLowerCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });

    case constants.SORT_TITLE_UP:
      return state.sort((a, b) => {
        let nameA = a.title.toLowerCase();
        let nameB = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

    case constants.SEARCH_BY_ACTOR_SUCCESS:
    case constants.SEARCH_BY_NAME_SUCCESS:
      return payload && payload.message && List(payload.message);

    case constants.MOVIE_GET_ALL_SUCCESS:
      const items = payload && Object.values(payload);
      return List(items || []); /*.filter(i => i.id >= 0); //TODO: update test for this case */

    default:
      return state;
  }
};

export default movies;
