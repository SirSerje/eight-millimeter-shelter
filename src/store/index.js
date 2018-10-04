import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import reducers from "../reducers"


const logger = createLogger({
  collapsed: true
});
const store = createStore(reducers, applyMiddleware(logger));

export default store;