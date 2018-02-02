import { storiesOf } from '@storybook/react';
import React from 'react';
import SpellRank from '../js/components/SpellRank';

storiesOf('SpellRank', module)
  .add('aethril rank 3', () => (
    <SpellRank name="aethril" rank="3" />
  ))
  .add('felwort rank 3', () => (
    <SpellRank name="felwort" rank="3" />
  ));
