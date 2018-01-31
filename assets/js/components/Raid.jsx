import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Raid = (props) => {
  const {
    id,
    when,
    title,
    description,
    size,
    participants,
  } = props;

  moment.locale('en');
  const dayOfWeek = moment.utc(when).format('dddd');
  const dayOfmonth = moment.utc(when).date();
  const time = moment.utc(when).format('hh:mm a');
  const raidTypeStyle = {
//    backgroundImage: `url(${icon})`,
  };
  return (
    <article id={id} className="raid">
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
        <div className="raid-type" style={raidTypeStyle}>
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
  id: PropTypes.string,
  when: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.number,
};

Raid.defaultProps = {
  id: '',
  when: '',
  title: '',
  description: '',
  size: 50,
};


export default Raid;
