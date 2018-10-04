import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger'
import reducers from "../reducers";
import thunk from "redux-thunk";

const logger = createLogger({
  collapsed: true
});

//pay attention: applyMiddleWare 'chained' - result depends on, what item will be placed first.
//for correct work thunk always should be placed before logger
export default createStore(
  reducers,
  applyMiddleware(thunk, logger)
);
