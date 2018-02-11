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
    const {
      raids,
      isFetching,
      region,
      side,
    } = this.props;
    const translateRegion = (regionCode) => {
      switch (regionCode) {
        case 'na':
          return 'us';
        default:
          return regionCode;
      }
    };
    let displayedRaids = raids;
    if (side) {
      displayedRaids = displayedRaids.filter(raid => raid.side === side);
    }
    if (region) {
      displayedRaids = displayedRaids.filter(raid => raid.region === translateRegion(region));
    }
    return (
      <div className="container">
        {isFetching && raids.length === 0 && <h2>Loading...</h2>}
        {
          displayedRaids.map(raid => (
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
  region: PropTypes.string,
  side: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

Timeline.defaultProps = {
  region: null,
  side: null,
};

const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    items: raids,
  } = state.raids || {
    isFetching: true,
    items: [],
  };

  const { region, side } = ownProps.match.params;

  return {
    isFetching,
    raids,
    region,
    side,
  };
};


export default connect(mapStateToProps)(Timeline);
