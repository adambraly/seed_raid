import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import DayView from '../containers/DayView';
import { fetchRaids } from '../actions/raids';
import { localNow, groupByDay } from '../utils/date';


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

    const now = localNow(region);
    const startOfDay = now.startOf('day');
    const hourAgo = now.subtract(4, 'hour');
    const fromDate = moment.min(startOfDay, hourAgo);
    const filteredRaid = raids
      .filter(raid => raid.side === side)
      .filter(raid => raid.region === translateRegion(region))
      .filter(raid => moment.utc(raid.when).isAfter(fromDate));
    const dayViews = groupByDay(filteredRaid, fromDate, region);

    return (
      <List>
        {
          isFetching && raids.length === 0 &&
          <div>
            <CircularProgress size={50} />
            <Typography variant="display1">
              Loading...
            </Typography>
          </div>
        }
        {
          dayViews.map(view => (
            <React.Fragment key={view.day}>
              <ListItem>
                <DayView raids={view.raids} day={view.day} />
              </ListItem>
              <Divider inset component="li" />
            </React.Fragment>
          ))
        }
      </List>
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
