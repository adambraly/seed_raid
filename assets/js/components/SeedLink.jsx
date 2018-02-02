import React from 'react';
import PropTypes from 'prop-types';
import WowheadItemLink from './WowheadItemLink';


const SeedLink = (props) => {
  const itemsID = {
    aethril: 129284,
    felwort: 129289,
  };
  const { name } = props;
  const itemID = itemsID[name];
  return (
    <WowheadItemLink id={itemID}>
      {`[${name} seed]`}
    </WowheadItemLink>
  );
};

SeedLink.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SeedLink;
