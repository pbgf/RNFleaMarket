import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)
store.subscribe(() => console.log(store.getState()))

export default store

// if (__DEV__) {
//   middlewares.push(logger);
// }

// export default createStore(reducers, composeWithDevTools(
//   applyMiddleware(
//     thunk,
//     navigator,
//   ),
// ))
