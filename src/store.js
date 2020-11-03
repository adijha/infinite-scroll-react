import {createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise-middleware';
import Reducers from './dataReducer';

const middlewares = [promise];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const configureStore = () => {
  const store = createStore(
    Reducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
};

export const store = configureStore();
