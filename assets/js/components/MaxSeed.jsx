import React from 'react';
import PropTypes from 'prop-types';
import SeedLink from './SeedLink';

const MaxSeed = (props) => {
  const { any, aethril } = props;
  console.dir(props);
  const seeds = [];

  const seedMaxSpan = (name, max) => {
    if (name === 'any') {
      return (
        <span>
          <span className="wowhead-item-link tooltip-item">
            [any seed]
            <div className="tooltip">
              {`${any} is the maximum quantity for any type of seed`}
            </div>
          </span> {` x ${any} `}
        </span>
      );
    }
    return (
      <span>
        <SeedLink name="aethril" />{` x ${max}`}
      </span>
    );
  };

  if (any) {
    seeds.push(seedMaxSpan('any', any));
  }
  if (aethril) {
    seeds.push(seedMaxSpan('aethril', aethril));
  }
  return (
    <ul>
      {seeds.map(seed => (
        <li>
          {seed}
        </li>
      ))}
    </ul>);
};

MaxSeed.defaultProps = {
  aethril: null,
  any: null,
};


MaxSeed.propTypes = {
  aethril: PropTypes.number,
  any: PropTypes.number,
};

export default MaxSeed;
