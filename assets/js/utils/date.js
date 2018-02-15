import moment from 'moment-timezone';

const timezone = (locale) => {
  switch (locale) {
    case 'us':
    case 'na':
      return 'EST';
    case 'eu':
    default:
      return 'CET';
  }
};


export const utcToLocal = (time, locale) => {
  const tz = timezone(locale);
  return moment.utc(time).tz(tz);
};

export const localNow = (locale) => {
  const tz = timezone(locale);
  return moment().tz(tz);
};

const dateFormatString = (locale) => {
  switch (locale) {
    case 'us':
      return 'MMMM DD, YYYY hh:mm';
    case 'eu':
    default:
      return 'DD MMMM YYYY hh:mm';
  }
};

const fulldate = (when, region) => {
  const whenHere = when.tz(timezone(region));
  const format = dateFormatString(region);
  return whenHere.format(format);
};

const filterByDay = (raids, day, region) => (
  raids.filter(raid => utcToLocal(raid.when, region).isSame(day, 'day'))
);

export const groupByDay = (raids, fromDay, region) => {
  if (raids.length === 0) {
    return [];
  }
  const day = moment(fromDay);
  const views = [];
  const lastDay = utcToLocal(raids[raids.length - 1].when, region);
  while (!day.isAfter(lastDay, 'day')) {
    const dayRaids = filterByDay(raids, day, region);
    views.push({ raids: dayRaids, day: moment(day) });
    day.add(1, 'days');
  }
  return views;
};


export default fulldate;
