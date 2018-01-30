import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Raid from './Raid';
import { fetchRaids } from '../actions/raids';

class TimelineApp extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRaids());
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


TimelineApp.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  raids: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    participants: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired,
    discord_id: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    isFetching,
    items: raids,
  } = state.raids || {
    isFetching: true,
    items: [],
  };
  return {
    isFetching,
    raids,
  };
};


export default connect(mapStateToProps)(TimelineApp);
