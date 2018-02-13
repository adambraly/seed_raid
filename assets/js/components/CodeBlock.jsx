import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';

const styles = () => ({
  pre: {
    'white-space': 'pre-wrap',
  },
});

class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  setRef(el) {
    this.codeEl = el;
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl);
  }

  render() {
    return (
      <pre className={this.props.classes.pre}>
        <code ref={this.setRef} className={this.props.language}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

CodeBlock.defaultProps = {
  language: '',
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  language: PropTypes.string,
};

export default  withStyles(styles)(CodeBlock);
