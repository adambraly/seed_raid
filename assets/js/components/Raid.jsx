import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const Raid = (props) => {
  const {
    content,
    seeds,
    when,
    type,
    region,
  } = props;

  const timezone = (locale) => {
    switch (locale) {
      case 'us':
        return 'EST';
      case 'eu':
        return 'CET';
      default:
        return 'CET';
    }
  };

  const whenHere = moment.utc(when).tz(timezone(region));
  const dayOfWeek = whenHere.format('dddd');
  const dayOfMonth = whenHere.date();
  const time = whenHere.format('HH:mm');

  const timelineImgClasses = raidType => (
    `timeline-img ${raidType}`
  );


  return (
    <div className="timeline-block">
      <div className={timelineImgClasses(type)}>
        <span className="size">{seeds}</span>
      </div>
      <div className="timeline-content">
        <ReactMarkdown
          source={content}
          skipHtml
          escapeHtml
          renderers={{ code: CodeBlock }}
        />,
        <figure className="datetime">
          <header>
            {dayOfWeek}
          </header>
          <section>
            {dayOfMonth}
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
  content: PropTypes.string.isRequired,
  seeds: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
};


export default Raid;
