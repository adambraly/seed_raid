import React from 'react';
import PropTypes from 'prop-types';
import Raid from './Raid';

const Timeline = (props) => {
  const { raids, isFetching } = props;
  return (
    <div>
      {isFetching && raids.length === 0 && <h2>Loading...</h2>}
      { raids.length > 0 &&
      <ul className="timeline">
        {
          raids.map(raid => (
            <Raid key={raid.id} tweet={raid} />
          ))
        }
      </ul>
      }
    </div>
  );
};

Timeline.propTypes = {
  raids: PropTypes.arrayOf(Raid.propTypes).isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
};


export default Timeline;
