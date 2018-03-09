
const CHANNELS = {
  eu: {
    timezone: 'CET',
    format: 'DD MMMM YYYY HH:mm',
  },

  'eu-alliance': {
    timezone: 'CET',
    region: 'na',
    side: 'alliance',
    format: 'DD MMMM YYYY HH:mm',
  },
  'eu-horde': {
    timezone: 'CET',
    region: 'eu',
    side: 'horde',
    format: 'DD MMMM YYYY HH:mm',
  },
  na: {
    timezone: 'America/New_York',
    format: 'MMMM DD, YYYY hh:mm a',
  },
  'na-alliance': {
    timezone: 'America/New_York',
    region: 'na',
    side: 'alliance',
    format: 'MMMM DD, YYYY hh:mm a',
  },
  'na-horde': {
    timezone: 'America/New_York',
    region: 'na',
    side: 'horde',
    format: 'MMMM DD, YYYY hh:mm a',
  },
};

export default CHANNELS;
