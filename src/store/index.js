import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import reducers from '../reducers';

export default function configureStore() {
  const createStoreWithMiddleware = applyMiddleware(
    thunk,
  )(createStore);
  const store = createStoreWithMiddleware(reducers);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
