import React from 'react';
import PropTypes from 'prop-types';

const WowheadSpellLink = (props) => {
  const { id } = props;
  const wowheadData = `spell=${id}`;
  const wowheadURL = `//www.wowhead.com/spell=${id}`;
  return (
    <a
      href={wowheadURL}
      className="wowhead-spell-link"
      data-wowhead={wowheadData}
    >
      {props.children}
    </a>
  );
};

WowheadSpellLink.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default WowheadSpellLink;
