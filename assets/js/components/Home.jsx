import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    'justify-content': 'space-around',
    'align-items': 'center',
    'flex-wrap': 'wrap',
    'z-index': -1,
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: '20px',
  },
});

const Home = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="headline" component="h3">Hello there</Typography>
        <Typography component="p">
          this is an experimentation made for <a className="green" href="https://discord.gg/wT8ZdSj">discord seed raid </a>
          fell free to look around :)
        </Typography>
      </Paper>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
