import * as reducer from './raids';

describe('updateRaid', () => {
  it('add the raid if does not exist', () => {
    const action = {
      channel: 'eu-europe',
      raid: { content: 'new raid', channel_slug: 'eu-europe' },
    };
    const state = {
      raids: {
        'eu-europe': [{ content: 'old raid', channel_slug: 'eu-europe' }],
      },
    };

    const expected = {
      raids: {
        'eu-europe': [{ content: 'old raid', channel_slug: 'eu-europe' }, { content: 'new raid', channel_slug: 'eu-europe' }],
      },
    };
    expect(reducer.updateRaid(state, action)).toEqual(expected);
  });
});
