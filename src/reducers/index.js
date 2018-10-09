import { combineReducers } from 'redux';
import getAll from './getAll';
import errors from './errors';

const reducers = combineReducers({
  getAll,
  errors,
});

export default reducers;
