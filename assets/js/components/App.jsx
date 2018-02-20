import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavBar from './NavBar';

export const styles = theme => ({
  main: {
    backgroundColor: theme.palette.background.default,
  },
  header: {
    backgroundColor: theme.palette.default,
  },
});

const App = props => (
  <React.Fragment>
    <header>
      <NavBar />
    </header>
    <main className={props.classes.main}>
      {props.children}
    </main>
  </React.Fragment>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
