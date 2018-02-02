import { storiesOf } from '@storybook/react';
import React from 'react';
import MaxSeed from '../js/components/MaxSeed';

const aethrilMax = {
  aethril: 10,
};

const anyMax = {
  any: 10,
};


const twoMax = {
  any: 25,
  aethril: 10,
};

storiesOf('MaxSeed', module)
  .add('aehtril max', () => (
    <MaxSeed {...aethrilMax} />
  ))
  .add('any max', () => (
    <MaxSeed {...anyMax} />
  ))
  .add('two max', () => (
    <MaxSeed {...twoMax} />
  ));
