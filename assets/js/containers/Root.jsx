import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import TimelineApp from '../components/TimelineApp';

const propTypes = {
  store: PropTypes.object.isRequired,
};

const Root = ({ store }) => (
  <Provider store={store}>
    <TimelineApp />
  </Provider>
);


Root.propTypes = propTypes;
export default Root;
