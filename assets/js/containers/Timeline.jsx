import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Raid from '../components/Raid';
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
    when: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    seeds: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
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
    params: {},
  };
  return {
    isFetching,
    raids,

  };
};


export default connect(mapStateToProps)(Timeline);
