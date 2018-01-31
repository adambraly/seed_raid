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
    <article className="raid">
      <figure>
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
      <section className="content">
        <div className="raid-type">
          <span className="size">
            {size}
          </span>
        </div>
        <div className="body">
          <h3 className="title">
            {title}
          </h3>
          <ul>
            <li><strong>Requirement: </strong>Aethril R3 Felwort R3</li>
            <li><strong>Participants: </strong>{participants}/10</li>
            <li><strong>Backup: </strong> 0</li>
            <li><strong>Description: </strong>{description}</li>
          </ul>
        </div>
      </section>
    </article>
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
