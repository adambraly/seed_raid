import React from 'react';
import NavBar from './NavBar';

import '../../css/main.scss';


const App = props => (
  <React.Fragment>
    <header>
      <NavBar />
    </header>
    <main>
      {props.children}
    </main>
  </React.Fragment>
);


export default App;
