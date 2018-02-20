import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.unit * 2,
  },
  action: {
    flex: '0 0 auto',
    alignSelf: 'flex-start',
    marginTop: theme.spacing.unit * -1,
    marginRight: theme.spacing.unit * -2,
  },
  content: {
    flex: '2 2 auto',
  },
  author: {
    'margin-left': 'auto',
    width: 'auto',
  },
  title: {
  },
  authornick: {
    width: 'auto',
    'margin-left': 'auto',
  },
  subheader: {
  },
});

function RaidHeader(props) {
  const {
    avatar,
    author,
    classes,
    className: classNameProp,
    component: Component,
    subheader,
    title,
    ...other
  } = props;

  return (
    <Component className={classNames(classes.root, classNameProp)} {...other}>
      <div className={classes.avatar}>{avatar}</div>
      <div className={classes.content}>
        <Typography
          variant={avatar ? 'body2' : 'headline'}
          component="span"
          className={classes.title}
        >
          {title}
        </Typography>
        <Typography
          variant={avatar ? 'body2' : 'body1'}
          component="span"
          color="textSecondary"
          className={classes.subheader}
        >
          {subheader}
        </Typography>
      </div>
      <div className={classes.author}>{author}</div>
    </Component>
  );
}

RaidHeader.propTypes = {

  /**
   * The Avatar for the Card Header.
   */
  avatar: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string.isRequired,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * The content of the component.
   */
  subheader: PropTypes.node.isRequired,
  /**
   * The content of the Card Title.
   */
  title: PropTypes.node.isRequired,
  author: PropTypes.node.isRequired,
};

RaidHeader.defaultProps = {
  component: 'div',
};

export default withStyles(styles, { name: 'MuiCardHeader' })(RaidHeader);
