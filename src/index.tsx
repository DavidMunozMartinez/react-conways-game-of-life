import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'smart-hoverjs';
import { createStore, } from 'redux';
import { Provider } from 'react-redux';

// Reducers
import { combineReducers } from 'redux';
import { configReducer } from './reducers/ConfigReducer';

let reducers = combineReducers({
  config: configReducer
});

let store = createStore(reducers);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'smart-hover': any;
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
