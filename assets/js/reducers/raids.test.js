import * as reducer from './raids';

describe('updateRaid', () => {
  it('add the raid if does not exist', () => {
    const action = {
      channel: 'eu-europe',
      raid: { id: 2, content: 'new raid', channel_slug: 'eu-europe' },
    };
    const state = {
      raids: {
        'eu-europe': [{ id: 1, content: 'old raid', channel_slug: 'eu-europe' }],
      },
    };

    const expected = {
      raids: {
        'eu-europe': [{ id: 1, content: 'old raid', channel_slug: 'eu-europe' }, { id: 2, content: 'new raid', channel_slug: 'eu-europe' }],
      },
    };
    expect(reducer.updateRaid(state, action)).toEqual(expected);
  });

  it('update it if it exists exist', () => {
    const action = {
      channel: 'eu-europe',
      raid: { id: 1, content: 'old raid updated', channel_slug: 'eu-europe' },
    };
    const state = {
      raids: {
        'eu-europe': [
          { id: 1, content: 'old raid', channel_slug: 'eu-europe' },
          { id: 2, content: 'second raid', channel_slug: 'eu-europe' },
        ],
      },
    };

    const expected = {
      raids: {
        'eu-europe': [{ id: 2, content: 'second raid', channel_slug: 'eu-europe' }, { id: 1, content: 'old raid updated', channel_slug: 'eu-europe' }],
      },
    };
    expect(reducer.updateRaid(state, action)).toEqual(expected);
  });
});
