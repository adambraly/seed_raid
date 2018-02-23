import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import ReactMarkdown from 'react-markdown';
import { withStyles } from 'material-ui/styles';
import { Row, Col } from 'react-flexbox-grid';
import homeMarkdown from '../../markdown/home.md';


const styles = theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: '20px',
    marginTop: '20px',
  },
  markdown: {
    whiteSpace: 'pre-wrap',
    fontFamily: theme.typography.fontFamily,
  },
});

const Home = (props) => {
  const { classes } = props;
  return (
    <Row around="xs" className={classes.root} >
      <Col xs={12} lg={8}>
        <Paper className={classes.paper}>
          <ReactMarkdown
            source={homeMarkdown}
            className={classes.markdown}
            skipHtml
            escapeHtml
          />
        </Paper>
      </Col>
    </Row>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
