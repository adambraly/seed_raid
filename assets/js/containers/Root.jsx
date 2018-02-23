import React from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Timeline from './Timeline';
import App from '../components/App';
import Home from '../components/Home';
import withTracker from './withTracker';


const propTypes = {
  store: PropTypes.object.isRequired,
};

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={withTracker(Home)} />
        <Route path="/calendar/:channel" component={withTracker(Timeline)} />
      </App>
    </Router>
  </Provider>
);


Root.propTypes = propTypes;
export default Root;
