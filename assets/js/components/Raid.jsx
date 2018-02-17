import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import ReactMarkdown from 'react-markdown';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Avatar from 'material-ui/Avatar';
import CodeBlock from './CodeBlock';
import RaidTitle from './RaidTitle';
import channels from '../channels';

import starlightRose from '../../static/images/starlight-rose.png';
import foxflower from '../../static/images/foxflower.png';
import mix from '../../static/images/mix.png';

const styles = theme => ({
  card: {
    width: '100%',
  },
  seedsAvatar: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
  },
  header: {
    padding: '12px',
  },
  cardActions: {
    height: '20px',
  },
  cardContent: {
    padding: '12px',
  },
  avatarBlock: {
    width: '100%',
    height: '100%',
  },
  seedsQuantity: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

const typeAvatar = (type) => {
  switch (type) {
    case 'starlight-rose':
      return starlightRose;
    case 'foxflower':
      return foxflower;
    case 'mix':
    default:
      return mix;
  }
};


class Raid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      content,
      seeds,
      when,
      type,
      classes,
      slug,
    } = this.props;


    const { timezone, format } = channels[slug];

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          avatar={
            <div>
              <Avatar className={classes.avatar}>
                <div className={classes.avatarBlock}>
                  <img
                    className={classes.seedsAvatar}
                    alt={type}
                    src={typeAvatar(type)}
                  />
                  <span className={classes.seedsQuantity}>{seeds}</span>
                </div>
              </Avatar>
            </div>
          }
          title={<RaidTitle type={type} seeds={seeds} />}
          subheader={moment.utc(when).tz(timezone).format(format)}
        />
        <CardContent>
          <CardActions className={classes.cardActions}>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <ReactMarkdown
              source={content}
              skipHtml
              escapeHtml
              renderers={{ code: CodeBlock }}
            />,
          </Collapse>
        </CardContent>
      </Card>
    );
  }
}

Raid.propTypes = {
  type: PropTypes.string.isRequired,
  when: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  seeds: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Raid);
