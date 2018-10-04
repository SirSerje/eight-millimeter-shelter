import {combineReducers} from "redux";
import addTodo from "./addTodo";
import appInitReducer from "./appInitReducer";
import * as moviesReducer from './movie'


const reducers = combineReducers({
  addTodo,
  appInitReducer,
  moviesReducer
});
export default reducers;