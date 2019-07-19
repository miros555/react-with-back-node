import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import allReducers from './reducers';
import * as serviceWorker from './serviceWorker';


{/*
// Reducer
const initialState = {
  users:[],
  url: '',
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_SUCCEEDED':
      return {
        users:action.users,
        url: action.url,
        loading: false,
        error: false,
      };
    case 'REQUESTED_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
*/}


// Store
const store = createStore(
  allReducers,
  applyMiddleware(thunk)
);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
