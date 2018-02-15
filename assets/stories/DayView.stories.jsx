/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import DayView from '../js/containers/DayView';

const raid1 = `
\`\`\`md
[100 Mix Seed raid. 2 Phase]


*  [Date](11/1/2018)
*  [Time](16:00 CET)
*  [Size](100 MIX, Max 10 FF, max 50 AT)


 Rules
 #1. If there is Invasion in Azsuna raid can be cancelled.
 #2. If you have FF plant them in extra FF round at the begining.
 #3. Voice chat is obligatory and 18+.
 #4. During foxflower harvesting phase only raid leader is allowed to speak on voice.

--------------------------------------
Invites start 10 min before raid time. Backups are obligated to be on time, too.
To sign up write "@Ozdi#8253 "
[1/10]: @Ozdi#8253
[backups 0/3]:
\`\`\`
`;

const raidList = [
  {
    when: '2019-01-29T00:00:00Z',
    type: 'starlight-rose',
    seeds: 200,
    side: 'alliance',
    region: 'eu',
    id: '3d903e60-19f5-4896-9052-1842ec7a508f',
    content: raid1,
  },
  {
    when: '2019-01-29T05:00:00Z',
    type: 'foxflower',
    seeds: 100,
    side: 'alliance',
    region: 'eu',
    id: '3d903e60-19f5-4896-9052-1842ec7a508f',
    content: raid1,
  },
  {
    when: '2019-01-29T07:00:00Z',
    type: 'mix',
    seeds: 50,
    side: 'alliance',
    region: 'eu',
    id: '3d903e60-19f5-4896-9052-1842ec7a508f',
    content: raid1,
  },
];

storiesOf('DayView', module)
  .add('raid1', () => (
    <DayView day="2019-01-29T00:00:00Z" raids={raidList} />
  ));
