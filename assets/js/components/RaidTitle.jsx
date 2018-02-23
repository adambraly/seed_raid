import React from 'react';
import PropTypes from 'prop-types';

const seedLink = (type) => {
  switch (type) {
    case 'mix':
      return 'mixed';
    case 'starlight-rose':
      return 'starlight roses';
    default:
      return type;
  }
};

const RaidTitle = (props) => {
  const { type, seeds, author } = props;

  return (
    <span>
      {seeds}  x {seedLink(type)} - {author}
    </span>
  );
};

RaidTitle.propTypes = {
  seeds: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default RaidTitle;
