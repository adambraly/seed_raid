import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Raid from '../components/Raid';
import { fetchRaids } from '../actions/raids';
import List, { ListItem } from 'material-ui/List';

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

    const startOfDay = moment().startOf('day');
    const hourAgo = moment().subtract(4, 'hour');
    const fromDate = moment.min(startOfDay, hourAgo);
    const displayedRaids = raids
      .filter(raid => raid.side === side)
      .filter(raid => raid.region === translateRegion(region))
      .filter(raid => moment.utc(raid.when).isAfter(fromDate));

    return (
      <div>
        <List>
          {isFetching && raids.length === 0 && <h2>Loading...</h2>}
          {
            displayedRaids.map(raid => (
              <ListItem>
                <Raid key={raid.id} {...raid} />
              </ListItem>
            ))
          }
        </List>
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
