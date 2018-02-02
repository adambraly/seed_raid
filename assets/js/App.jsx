// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"


import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import Root from './containers/Root';


const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root'),
);
