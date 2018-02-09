import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const Raid = (props) => {
  const {
    title,
    size,
    participants,
    description,
    when,
    type,
  } = props;

  moment.locale('en');
  const dayOfWeek = moment.utc(when).format('dddd');
  const dayOfmonth = moment.utc(when).date();
  const time = moment.utc(when).format('hh:mm a');

  const timelineImgClasses = raidType => (
    `timeline-img ${raidType}`
  );

  const typeFontClasses = raidType => (
    `type-font-color ${raidType}`
  );

  return (
    <div className="timeline-block">
      <div className={timelineImgClasses(type)}>
        <span className="size">{size}</span>
      </div>
      <div className="timeline-content">
        <h3 className={typeFontClasses(type)}>{title}</h3>
        <div>
          {description}
        </div>
        <footer>
          Participants: {participants}/10
        </footer>
        <figure className="datetime">
          <header>
            {dayOfWeek}
          </header>
          <section>
            {dayOfmonth}
          </section>
          <footer>
            {time}
          </footer>
        </figure>
      </div>
    </div>
  );
};

Raid.propTypes = {
  when: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  size: PropTypes.number.isRequired,
  participants: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

Raid.defaultProps = {
  description: '',
};


export default Raid;
