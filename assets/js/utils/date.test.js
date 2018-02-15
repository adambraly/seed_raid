import moment from 'moment-timezone';
import { groupByDay } from './date';


describe('groupByDay', () => {
  it('return empty if raids is empty', () => {
    const fromDay = moment();
    expect(groupByDay([], fromDay, 'eu')).toEqual([]);
  });

  it('return one day when all raid are at the same day', () => {
    const fromDay = moment.tz('2019-01-29 00:00', 'CET');
    const raids = [
      { when: '2019-01-29T05:00:00Z', content: 'first' },
      { when: '2019-01-29T05:00:00Z', content: 'second' },
    ];
    const expectation = [
      {
        day: fromDay,
        raids,
      },
    ];
    expect(groupByDay(raids, fromDay, 'eu')).toEqual(expectation);
  });
  it('return first day empty if there is nothing first day', () => {
    const fromDay = moment.tz('2019-01-28 00:00', 'CET');
    const raids = [
      { when: '2019-01-29T05:00:00Z', content: 'first' },
      { when: '2019-01-29T05:00:00Z', content: 'second' },
    ];
    const expectation = [
      {
        day: moment(fromDay),
        raids: [],
      },
      {
        day: moment(fromDay).add(1, 'days'),
        raids,
      },
    ];
    expect(groupByDay(raids, fromDay, 'eu')).toEqual(expectation);
  });
});
