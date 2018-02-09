import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const Raid = (props) => {
  const {
    content,
    seeds,
    when,
    type,
  } = props;

  moment.locale('en');
  const dayOfWeek = moment.utc(when).format('dddd');
  const dayOfMonth = moment.utc(when).date();
  const time = moment.utc(when).format('hh:mm a');

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
};


export default Raid;
