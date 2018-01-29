import React from 'react';
import PropTypes from 'prop-types';
import Raid from './Raid';
import fetchRaids from '../actions/raids';

class Timeline extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRaids);
  }

  render() {
    const { raids, isFetching } = this.props;
    return (
      <div>
        {isFetching && raids.length === 0 && <h2>Loading...</h2>}
        { raids.length > 0 &&
        <ul className="timeline">
          {
            raids.map(raid => (
              <Raid key={raid.id} tweet={raid} />
            ))
          }
        </ul>
        }
      </div>
    );
  }
}

Timeline.propTypes = {
  raids: PropTypes.arrayOf(Raid.propTypes).isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


export default Timeline;
