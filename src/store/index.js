import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const logger = createLogger({
  collapsed: true,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));
const store = createStore(reducers, enhancer);
export default store;
