// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"


import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store';
import Root from './containers/Root';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const store = configureStore({}, history);

render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);
