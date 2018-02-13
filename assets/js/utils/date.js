
const timezone = (locale) => {
  switch (locale) {
    case 'us':
      return 'EST';
    case 'eu':
    default:
      return 'CET';
  }
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


export default fulldate;
