import moment from 'moment-timezone';
import groupByDay from './date';


describe('groupByDay', () => {
  it('return empty if raids is empty', () => {
    expect(groupByDay([], 'CET')).toEqual([]);
  });

  it('return one day when all raid are at the same day', () => {
    const raids = [
      { when: '2019-01-29T05:00:00Z', content: 'first' },
      { when: '2019-01-29T05:00:00Z', content: 'second' },
    ];
    const expectation = [
      {
        day: moment.utc('2019-01-29T05:00:00Z').tz('CET'),
        raids,
      },
    ];
    expect(groupByDay(raids, 'CET')).toEqual(expectation);
  });
});
