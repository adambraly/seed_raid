import React from 'react';
import PropTypes from 'prop-types';
import SpellRank from './SpellRank';

const Requirements = (props) => {
  const { felwort, aethril } = props;
  const spells = [];
  if (felwort) {
    spells.push(<SpellRank name="felwort" rank={felwort} />);
  }
  if (aethril) {
    spells.push(<SpellRank name="aethril" rank={aethril} />);
  }
  return (
    <ul>
      {spells.map(spell => (
        <li>
          {spell}
        </li>
      ))}
    </ul>);
};

Requirements.defaultProps = {
  aethril: 3,
  felwort: 3,
};


Requirements.propTypes = {
  aethril: PropTypes.number,
  felwort: PropTypes.number,
};

export default Requirements;
