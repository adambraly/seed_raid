/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import SeedLink from '../js/components/SeedLink';

storiesOf('SeedLink', module)
  .add('aethril', () => (
    <SeedLink name="aethril" />
  ))
  .add('felwort', () => (
    <SeedLink name="felwort" />
  ));
