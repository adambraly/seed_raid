// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"


import React from 'react';
import { render } from 'react-dom';
import Hello from './components/Hello';

render(<Hello />, document.getElementById('app'));
