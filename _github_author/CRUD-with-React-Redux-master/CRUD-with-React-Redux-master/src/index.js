import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import LogIn from './LogIn';
import SignUp from './SignUp';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import postReducer from './reducers/postReducer';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import authReducer from './reducers/authReducer';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

const reducer = combineReducers({
  posts: postReducer,
  errors: errorReducer,
  loading: loadingReducer,
  authed: authReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(ReduxThunk)
    // other store enhancers if any
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
