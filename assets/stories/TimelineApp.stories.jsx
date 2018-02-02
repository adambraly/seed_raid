import fetchMock from 'fetch-mock';
import { storiesOf } from '@storybook/react';
import React from 'react';
import configureStore from '../js/store';
import Root from '../js/containers/Root';

const store = configureStore();

const payload = {
  data: [
    {
      when: '2017-01-29T00:00:00.000000Z',
      title: 'SLR 100',
      type: 'starlight-rose',
      size: 200,
      side: 'alliance',
      region: 'eu',
      participants: 1,
      id: '3d903e60-19f5-4896-9052-1842ec7a508f',
      discord_id: 1234,
      requirements: {
        aethril: 3,
        felwort: 3,
      },
    },
    {
      when: '2017-01-25T00:00:00.000000Z',
      title: 'AHOUU 100',
      type: 'foxflower',
      size: 50,
      side: 'alliance',
      region: 'eu',
      participants: 1,
      id: '3d903e60-19f5-4298-9052-1842ec7a508f',
      discord_id: 1234,
      requirements: {
        aethril: 3,
        felwort: 3,
      },
    },
    {
      when: '2017-01-24T00:00:00.000000Z',
      title: 'MIX 50',
      type: 'mix',
      size: 50,
      side: 'alliance',
      region: 'eu',
      participants: 1,
      id: '3d903e60-19f5-5698-9052-1842ec7a508f',
      discord_id: 1234,
      max: {
        aethril: 10,
        any: 25,
      },
    },
  ],
};

storiesOf('App', module).add('success', () => {
  fetchMock
    .restore()
    .getOnce(
      'http://localhost:4000/api/raids',
      payload,
    );
  return <Root store={store} />;
});
