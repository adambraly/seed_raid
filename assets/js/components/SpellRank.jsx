import React from 'react';
import PropTypes from 'prop-types';
import WowheadSpellLink from './WowheadSpellLink';


const SpellRank = (props) => {
  const spellsID = {
    aethril: {
      3: 193417,
    },
    felwort: {
      3: 193309,
    },
  };
  const { name, rank } = props;
  const spellID = spellsID[name][rank];
  return (
    <WowheadSpellLink id={spellID}>
      {`${name} rank ${rank}`}
    </WowheadSpellLink>
  );
};

SpellRank.propTypes = {
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
};

export default SpellRank;
