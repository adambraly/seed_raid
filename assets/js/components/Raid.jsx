import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import ReactMarkdown from 'react-markdown';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Avatar from 'material-ui/Avatar';
import CodeBlock from './CodeBlock';
import RaidTitle from './RaidTitle';
import channels from '../channels';
import DiscordAvatar from './DiscordAvatar';
import RaidHeader from './RaidHeader';
import Roster from './Roster';

import starlightRose from '../../static/images/starlight-rose.png';
import foxflower from '../../static/images/foxflower.png';
import mix from '../../static/images/mix.png';
import dreamleaf from '../../static/images/dreamleaf.png';
import fjarnskaggl from '../../static/images/fjarnskaggl.png';

const styles = theme => ({
  card: {
    width: '100%',
  },
  bigAvatar: {
    width: 54,
    height: 54,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
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
  markdown: {
    whiteSpace: 'pre-wrap',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    lineHeight: theme.typography.body1.lineHeight,
    color: theme.typography.body1.color,
    width: '95%',
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
    case 'dreamleaf':
      return dreamleaf;
    case 'fjarnskaggl':
      return fjarnskaggl;
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
      author,
      content,
      seeds,
      when,
      type,
      classes,
      slug,
      roster,
      backup,
    } = this.props;

    const { timezone, format } = channels[slug];

    const authorName = (nickParam, usernameParam) => {
      if (nickParam) {
        return nickParam;
      }
      return usernameParam;
    };

    return (
      <Card className={classes.card}>
        <RaidHeader
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
          author={<DiscordAvatar className={classes.bigAvatar} {...author} />}
          title={
            <RaidTitle
              type={type}
              seeds={seeds}
              author={authorName(author.nick, author.username)}
            />}
          subheader={moment.utc(when).tz(timezone).format(format)}
        />
        <CardContent>
          <Roster roster={roster} max={10} />
          <Roster roster={backup} max={3} />
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
              className={classes.markdown}
              skipHtml
              escapeHtml
              renderers={{ code: CodeBlock }}
              disallowedTypes={['link', 'linkReference', 'image', 'imageReference']}
            />
          </Collapse>
        </CardContent>
      </Card>
    );
  }
}

Raid.propTypes = {
  author: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  when: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  seeds: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  roster: PropTypes.array.isRequired,
  backup: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Raid);
