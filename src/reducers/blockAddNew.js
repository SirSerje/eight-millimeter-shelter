import * as constants from '../constants/index';
// import update from "immutability-helper";

let blockAddNew = (state = 0, action) => {
  switch (action.type) {
    case constants.MOVIE_ADD_NEW_PENDING:
      return action.payload.block;

    default:
      return 0;
  }
};

export default blockAddNew;
