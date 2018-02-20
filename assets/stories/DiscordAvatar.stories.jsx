/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import DiscordAvatar from '../js/components/DiscordAvatar';

storiesOf('DiscordAvatar', module)
  .add('my avatar', () => (
    <DiscordAvatar
      nick="Breq-Archimonde"
      avatar="21242e975b4939745fa19d117c08e2d7"
      id="236544307203538946"
    />
  ));
