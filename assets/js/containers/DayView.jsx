import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { Row, Col, Grid } from 'react-flexbox-grid';
import List, { ListItem } from 'material-ui/List';
import Raid from '../components/Raid';

const styles = theme => ({
  dayBlock: {
    'padding-top': 32,
  },
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '4px',
      paddingRight: '4px',
    },
  },
  dayTypo: {
  },
  todayTypo: {
    color: theme.palette.primary.main,
  },
});

const DayView = (props) => {
  const {
    raids,
    day,
    classes,
    slug,
  } = props;

  const dayClass = moment().isSame(day, 'day') ? classes.todayTypo : classes.dayTypo;

  const dayName = moment(day).format('dddd');
  const dayOfMonth = moment(day).format('DD');
  return (
    <Grid className={classes.root}>
      <Row center="xs">
        <Col xs={12} md={2}>
          <div className={classes.dayBlock}>
            <Typography variant="headline" align="center" className={dayClass}>
              {dayName}
            </Typography>
            <Typography variant="subheading" className={dayClass}>
              {dayOfMonth}
            </Typography>
          </div>
        </Col>
        <Col xs={12} md={10} lg={8}>
          <List>
            {
              raids.map(raid => (
                <ListItem key={raid.id}>
                  <Raid slug={slug} {...raid} />
                </ListItem>
              ))
            }
          </List>
        </Col>
      </Row>
    </Grid>
  );
};

DayView.propTypes = {
  day: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  raids: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    seeds: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DayView);
