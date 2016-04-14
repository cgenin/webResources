import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import Provider from 'react-redux/lib/components/Provider';
import thunkMiddleware from 'redux-thunk';
import logMiddleware from 'redux-logger';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';
import {syncHistoryWithStore, routerReducer } from 'react-router-redux';


import {reducers} from './modules/project/reducers';
import routes from './routes';


const rootReducer = combineReducers({
  routing: routerReducer ,
  projects: reducers
});

export const store = compose(
  applyMiddleware(
    thunkMiddleware,
    logMiddleware()
  )
)(createStore)(rootReducer);

const history = syncHistoryWithStore(hashHistory, store);


injectTapEventPlugin();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
