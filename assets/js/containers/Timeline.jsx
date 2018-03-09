import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import moment from 'moment-timezone';
import DayView from '../containers/DayView';
import { fetchRaids } from '../actions/raids';
import groupByDay from '../utils/date';
import channels from '../channels';

const styles = theme => ({
  list: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '4px',
      paddingRight: '4px',
    },
  },
});

class Timeline extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRaids());
  }


  render() {
    const {
      raids,
      isFetching,
      channel,
      classes,
    } = this.props;

    const getRaids = (virtualChannel) => {
      switch (virtualChannel) {
        case 'eu':
          return raids['eu-horde'].concat(raids['eu-alliance']);
        case 'na':
          return raids['na-horde'].concat(raids['na-alliance']);
        default:
          return raids[virtualChannel];
      }
    };

    const sortRaidsByTime = allraids => (
      allraids.sort((a, b) => (moment(a.when) > moment(b.when)))
    );

    let dayViews = [];

    if (!isFetching) {
      const tz = channels[channel].timezone;
      let viewRaids = getRaids(channel) || [];
      viewRaids = sortRaidsByTime(viewRaids);
      dayViews = groupByDay(viewRaids, tz);
    }

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
              <ListItem className={classes.list}>
                <DayView raids={view.raids} day={view.day} slug={channel} />
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
  raids: PropTypes.object.isRequired,
  channel: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    raids,
  } = state.raids || {
    isFetching: true,
    raids: {},
  };

  const { channel } = ownProps.match.params;

  return {
    isFetching,
    raids,
    channel,
  };
};


export default connect(mapStateToProps)(withStyles(styles)(Timeline));
