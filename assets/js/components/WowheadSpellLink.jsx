import React from 'react';
import PropTypes from 'prop-types';

export const WowheadSpellLink = (props) => {
  const wowheadLink = id => (
    `//www.wowhead.com/spell=${id}`
  );
  return (
    <a href={wowheadLink(props.id)} className="wowhead-spell-link">
      {props.children}
    </a>
  );
};

WowheadSpellLink.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default WowheadSpellLink;
