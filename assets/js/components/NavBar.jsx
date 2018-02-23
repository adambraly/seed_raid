import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  materialLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const NavBar = (props) => {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          <Link to="/" className={classes.materialLink}>
            Seed Raid
          </Link>
        </Typography>
        <Typography color="inherit" className={classes.flex}>
          <Link to="/calendar/eu-alliance" className={classes.materialLink}>
            EU Alliance
          </Link>
        </Typography>
        <Typography color="inherit" className={classes.flex}>
          <Link to="/calendar/eu-horde" className={classes.materialLink}>
            EU Horde
          </Link>
        </Typography>
        <Typography color="inherit" className={classes.flex}>
          <Link to="/calendar/na-alliance" className={classes.materialLink}>
            NA Alliance
          </Link>
        </Typography>
        <Typography color="inherit" className={classes.flex}>
          <Link to="/calendar/na-horde" className={classes.materialLink}>
            NA Horde
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NavBar);
