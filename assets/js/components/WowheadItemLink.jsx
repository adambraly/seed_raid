import React from 'react';
import PropTypes from 'prop-types';

const WowheadItemLink = (props) => {
  const wowheadData = (bonuses, gems, enchant) => {
    const rel = [];
    if (bonuses.length > 0) {
      rel.push(`bonus=${bonuses.join(':')}`);
    }
    if (gems.length > 0) {
      rel.push(`;gems=${gems.join(':')}`);
    }
    if (enchant) {
      rel.push(`ench=${enchant}`);
    }
    return rel.join(';');
  };


  const wowheadLink = id => (
    `//www.wowhead.com/item=${id}`
  );

  return (
    <a
      href={wowheadLink(props.id)}
      className="wowhead-item-link"
      data-wowhead={wowheadData(props.bonuses, props.gems, props.enchant)}
    >
      {props.children}
    </a>
  );
};

WowheadItemLink.defaultProps = {
  bonuses: [],
  gems: [],
  enchant: null,
};

WowheadItemLink.propTypes = {
  id: PropTypes.number.isRequired,
  bonuses: PropTypes.arrayOf(PropTypes.number),
  enchant: PropTypes.number,
  gems: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node.isRequired,
};

export default WowheadItemLink;
