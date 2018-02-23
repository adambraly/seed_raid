import React from 'react';
import PropTypes from 'prop-types';
import WowheadItemLink from './WowheadItemLink';


const SeedLink = (props) => {
  const itemsID = {
    aethril: 129284,
    dremleaf: 124102,
    felwort: 129289,
    'starlight-rose': 124105,
    foxflower: 124103,
  };
  const { seed, value } = props;
  const itemID = itemsID[seed];
  return (
    <WowheadItemLink id={itemID}>
      {value}
    </WowheadItemLink>
  );
};

SeedLink.propTypes = {
  seed: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SeedLink;
