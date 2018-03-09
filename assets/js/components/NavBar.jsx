import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Col, Row } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = () => ({
  root: {
    width: '100%',
  },
  channel: {
    paddingLeft: '4px',
    paddingRight: '4px',
    marginTop: '5px',
    display: 'block',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  region: {
    flexFlow: 'row wrap',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  materialLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const NavBar = (props) => {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Col xs={6} sm={3} lg={2}>
          <Row>
            <Col xs={12}>
              <Typography color="inherit" className={classes.channel}>
                <Link to="/calendar/eu" className={classes.materialLink}>
                  EUROPE
                </Link>
              </Typography>
            </Col>
          </Row>
          <Row className={classes.region}>
            <Col xs={6}>
              <Typography color="inherit" className={classes.channel}>
                <Link to="/calendar/eu-alliance" className={classes.materialLink}>
                  ALLIANCE
                </Link>
              </Typography>
            </Col>
            <Col xs={6}>
              <Typography color="inherit" className={classes.channel}>
                <Link to="/calendar/eu-horde" className={classes.materialLink}>
                  HORDE
                </Link>
              </Typography>
            </Col>
          </Row>
        </Col>
        <Col xs={6} sm={3} lg={2}>
          <Row>
            <Col xs={12} lg={12}>
              <Typography color="inherit" className={classes.channel}>
                <Link to="/calendar/na" className={classes.materialLink}>
                  NORTH AMERICA
                </Link>
              </Typography>
            </Col>
          </Row>
          <Row className={classes.region}>
            <Col xs={6}>
              <Typography color="inherit" className={classes.channel}>
                <Link to="/calendar/na-alliance" className={classes.materialLink}>
                  ALLIANCE
                </Link>
              </Typography>
            </Col>
            <Col xs={6}>
              <Typography color="inherit" className={classes.channel}>
                <Link to="/calendar/na-horde" className={classes.materialLink}>
                  HORDE
                </Link>
              </Typography>
            </Col>
          </Row>
        </Col>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NavBar);
