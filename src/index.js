import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import { createSelector } from 'reselect';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reducer from './reducer';




// Store
const store = createStore(
  reducer,
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
