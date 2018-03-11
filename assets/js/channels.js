
const CHANNELS = {
  eu: {
    timezone: 'CET',
    format: 'DD MMMM YYYY HH:mm z',
  },

  'eu-alliance': {
    timezone: 'CET',
    region: 'na',
    side: 'alliance',
    format: 'DD MMMM YYYY HH:mm z',
  },
  'eu-horde': {
    timezone: 'CET',
    region: 'eu',
    side: 'horde',
    format: 'DD MMMM YYYY HH:mm z',
  },
  na: {
    timezone: 'America/New_York',
    format: 'MMMM DD, YYYY hh:mm a z',
  },
  'na-alliance': {
    timezone: 'America/New_York',
    region: 'na',
    side: 'alliance',
    format: 'MMMM DD, YYYY hh:mm a z',
  },
  'na-horde': {
    timezone: 'America/New_York',
    region: 'na',
    side: 'horde',
    format: 'MMMM DD, YYYY hh:mm a z',
  },
};

export default CHANNELS;
