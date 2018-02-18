import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

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

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
