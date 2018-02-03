import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Raid from './Raid';
import { fetchRaids } from '../actions/raids';

class Timeline extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRaids());
  }

  render() {
    const { raids, isFetching } = this.props;
    return (
      <div className="container">
        {isFetching && raids.length === 0 && <h2>Loading...</h2>}
        {
          raids.map(raid => (
            <Raid key={raid.id} {...raid} />
          ))
        }
      </div>
    );
  }
}


Timeline.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  raids: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    participants: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired,
    discord_id: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    requirements: PropTypes.shape({
      aethril: PropTypes.number,
      felwort: PropTypes.number,
    }),
    max: PropTypes.shape({
      aethril: PropTypes.number,
      any: PropTypes.number,
    }),
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


export default connect(mapStateToProps)(Timeline);
