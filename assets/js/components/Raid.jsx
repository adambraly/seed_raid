import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';



const Raid = (props) => {
  const {
    title,
    description,
    size,
    participants,
    when,
  } = props;

  moment.locale('en');
  const dayOfWeek = moment.utc(when).format('dddd');
  const dayOfmonth = moment.utc(when).date();
  const time = moment.utc(when).format('hh:mm a');

  return (
    <div className="timeline-block">
      <div className="timeline-img movie">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-movie.svg" alt="Movie" />
      </div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <p>
          <ul>
            <li>participants: {participants}/10</li>
          </ul>
        </p>
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
};

Raid.defaultProps = {
  description: '',
};


export default Raid;
