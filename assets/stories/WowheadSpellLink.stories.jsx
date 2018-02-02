import { storiesOf } from '@storybook/react';
import React from 'react';
import WowheadSpellLink from '../js/components/WowheadSpellLink';

storiesOf('WowheadSpellLink', module)
  .add('plant dreamleaf', () => (
    <WowheadSpellLink id="193797">plant dreamleaf</WowheadSpellLink>
  ));
