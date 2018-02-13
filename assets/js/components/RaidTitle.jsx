import React from 'react';
import PropTypes from 'prop-types';
import SeedLink from './SeedLink';

const seedLink = (type) => {
  switch (type) {
    default:
    case 'mix':
      return 'mixed';
    case 'starlight-rose':
      return (
        <SeedLink
          seed="starlight-rose"
          value="starlight roses"
        />
      );
    case 'foxflower':
      return (
        <SeedLink
          seed="foxflower"
          value="foxflowers"
        />
      );
  }
};

const RaidTitle = (props) => {
  const { type, seeds } = props;

  return (
    <span>
      {seeds} x {seedLink(type)}
    </span>
  );
};

RaidTitle.propTypes = {
  seeds: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RaidTitle;
