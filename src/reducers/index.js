import { combineReducers } from 'redux';
import movies from './movies';
import errors from './errors';

const reducers = combineReducers({
  movies,
  errors,
});

export default reducers;
