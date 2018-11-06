import hljs from 'highlight.js';
import React from 'react';

class Highlight extends React.Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      codeBlocks: [],
    };
    this.setEl = this.setEl.bind(this);
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentWillReceiveProps(newProps) {
    const { text } = this.props;
    if (text !== newProps.text) {
      const codeRegexp = /(?:```[a-z])*\n([\s\S]*?\n)(?:```)/g;
      const codeBlocks = newProps.text.match(codeRegexp);
      this.setState({
        codeBlocks,
      });
    }
  }

  componentDidUpdate() {
    this.highlightCode();
  }


  setEl(el) {
    this.el = el;
  }

  highlightCode() {
    const nodes = this.el.querySelectorAll('pre code');
    const codeBlocks = this.state.codeBlocks;
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].textContent = (codeBlocks && codeBlocks[i]) || nodes[i].textContent;
      hljs.highlightBlock(nodes[i]);
    }
  }

  render() {
    const { children, className, element: Element, innerHTML } = this.props;
    const props = { ref: this.setEl, className };

    if (innerHTML) {
      props.dangerouslySetInnerHTML = { __html: children };
      if (Element) {
        return <Element {...props} />;
      }
      return <div {...props} />;
    }

    if (Element) {
      return <Element {...props}>{children}</Element>;
    }
    return (
      <pre ref={this.setEl}>
        <code className={className}>{children}</code>
      </pre>
    );
  }
}


Highlight.defaultProps = {
  innerHTML: false,
  text: '',
  className: null,
  element: null,
};

export default Highlight;
