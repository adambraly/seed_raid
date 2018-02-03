import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Timeline from '../components/Timeline';
import App from '../components/App';
import Home from '../components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const propTypes = {
  store: PropTypes.object.isRequired,
};

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <App>
        <Route eact path="/" component={Home} />
        <Route path="/calendar/:channel" component={Timeline} />
      </App>
    </Router>
  </Provider>
);


Root.propTypes = propTypes;
export default Root;
