import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import WowheadItemLink from './WowheadItemLink';

const styles = () => ({
  link: {
    color: 'inherit',
    'text-decoration': 'none',
  },
});

const SeedLink = (props) => {
  const itemsID = {
    aethril: 129284,
    felwort: 129289,
    'starlight-rose': 124105,
    foxflower: 124103,
  };
  const { seed, value, classes } = props;
  const itemID = itemsID[seed];
  return (
    <WowheadItemLink id={itemID} className={classes.link}>
      {value}
    </WowheadItemLink>
  );
};

SeedLink.propTypes = {
  seed: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeedLink);
