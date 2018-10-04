import {combineReducers} from "redux";
import addTodo from "./addTodo";
import appInitReducer from "./initReducer";
import updateExisting from "./movie/updateExisting";
import getById from "./movie/getById";
import addNew from "./movie/addNew";
import getAll from "./movie/getAll";
import movieDelete from './movie/movieDelete'


const reducers = combineReducers({
  addTodo,
  appInitReducer,

  updateExisting,
  movieDelete,
  getById,
  getAll,
  addNew
});
export default reducers;