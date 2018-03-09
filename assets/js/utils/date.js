import moment from 'moment-timezone';


const filterByDay = (raids, day, tz) => (
  raids.filter(raid => moment.utc(raid.when).tz(tz).isSame(day, 'day'))
);

export function sortRaidsByTime(raids) {
  raids.sort((a, b) => (moment(a.when) > moment(b.when)));
}

const groupByDay = (raids, tz) => {
  if (raids.length === 0) {
    return [];
  }
  const views = [];
  const lastDay = moment.utc(raids[raids.length - 1].when).tz(tz).startOf('day');
  const day = moment.utc(raids[0].when).tz(tz).startOf('day');
  while (!day.isAfter(lastDay, 'day')) {
    const raidsOfTheDay = filterByDay(raids, day, tz);
    views.push({ raids: raidsOfTheDay, day: moment(day) });
    day.add(1, 'days');
  }
  return views;
};

export default groupByDay;
