import { combineReducers } from 'redux';
import getAll from './getAll';
import errors from './errors';
import blockAddNew from './blockAddNew';

const reducers = combineReducers({
  getAll,
  errors,
  blockAddNew,
});

export default reducers;
