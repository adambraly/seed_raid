import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import DiscordAvatar from './DiscordAvatar';

const styles = theme => ({
  root: {
    marginTop: '15px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '15px',
  },
  dummy: {
    backgroundColor: theme.palette.grey[400],
  },
  member: {
    width: 30,
    height: 30,
  },
});

const Roster = (props) => {
  const { roster, max, classes } = props;

  const dummy = i => (
    <Col lg={1} key={i.toString()}>
      <Avatar className={classNames(classes.member, classes.dummy)}>
        {i}
      </Avatar>
    </Col>
  );

  const dummies = (from, until) => {
    const result = [];
    for (let i = from; i <= until; i += 1) {
      result.push(dummy(i));
    }
    return result;
  };

  return (
    <div className={classes.root}>
      <Row>

        {
          roster.map(member => (
            <Col lg={1} key={member.id}>
              <DiscordAvatar {...member} className={classes.member} />
            </Col>))
        }
        { roster.length < max &&
          dummies(roster.length + 1, max)
        }
      </Row>
    </div>
  );
};

Roster.propTypes = {
  roster: PropTypes.arrayOf(PropTypes.shape({
    nick: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    discriminator: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  classes: PropTypes.object.isRequired,
  max: PropTypes.number.isRequired,
};

export default withStyles(styles)(Roster);
