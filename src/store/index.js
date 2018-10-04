import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import reducers from "../reducers"
import { compose } from "redux";
import thunk from "redux-thunk";

const logger = createLogger({
  collapsed: true
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, applyMiddleware(logger));
export default store;

/*
export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
}*/
