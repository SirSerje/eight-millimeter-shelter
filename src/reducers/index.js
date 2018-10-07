import {combineReducers} from "redux";
import appInitReducer from "./initReducer";
import getAll from "./getAll";


const reducers = combineReducers({
  appInitReducer,
  getAll,
});
export default reducers;
