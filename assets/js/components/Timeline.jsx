import React from 'react';
import Raid from './Raid';

const Timeline = (props) => {
  // Build list items of single tweet components using map
  const content = props.raids.map((raid) => {
    return (
      <Raid key={raid.id} tweet={raid} />
    );
  });

    // Return ul filled with our mapped tweets
  return (
    <ul className="timeline">{content}</ul>
  );
};

export default Timeline;
