import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Timeline from './Timeline';
import App from '../components/App';
import Home from '../components/Home';


const propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/calendar/:region/:side" component={Timeline} />
      </App>
    </ConnectedRouter>
  </Provider>
);


Root.propTypes = propTypes;
export default Root;
