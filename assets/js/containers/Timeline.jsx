import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import DayView from '../containers/DayView';
import { fetchRaids } from '../actions/raids';
import { groupByDay } from '../utils/date';
import channels from '../channels';

class Timeline extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRaids());
  }

  render() {
    const {
      raids,
      isFetching,
      slug,
    } = this.props;

    const tz = channels[slug].timezone;
    const viewRaids = raids[slug];
    const dayViews = groupByDay(viewRaids, tz);

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
                <DayView raids={view.raids} day={view.day} slug={slug} />
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
  slug: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    items: raids,
  } = state.raids || {
    isFetching: true,
    items: [],
  };

  const { slug } = ownProps.match.params;

  return {
    isFetching,
    raids,
    slug,
  };
};


export default connect(mapStateToProps)(Timeline);
