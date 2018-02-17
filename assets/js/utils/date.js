import moment from 'moment-timezone';

const fulldate = (when, format, tz) => {
  const whenHere = when.tz(tz);
  return whenHere.format(format);
};

const filterByDay = (raids, day, tz) => (
  raids.filter(raid => moment.utc(raid.when).tz(tz).isSame(day, 'day'))
);

export const groupByDay = (raids, tz) => {
  if (raids.length === 0) {
    return [];
  }
  const today = moment();
  const firstRaidDay = moment.utc(raids[0].when).tz(tz);
  const views = [];
  const lastDay = moment.utc(raids[raids.length - 1].when, tz);
  const day = moment.min(today, firstRaidDay);
  while (!day.isAfter(lastDay, 'day')) {
    const raidsOfTheDay = filterByDay(raids, day, tz);
    views.push({ raids: raidsOfTheDay, day: moment(day) });
    day.add(1, 'days');
  }
  return views;
};


export default fulldate;
