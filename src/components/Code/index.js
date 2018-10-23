/**
 *
 * Code
 *
 */

import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

class Code extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.createRef = this.createRef.bind(this);
    this.onClickSelect = this.onClickSelect.bind(this);
  }

  createRef(target) {
    this.elementRef = target;
  }

  onClickSelect(evt) {
    evt.preventDefault();
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(this.elementRef);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  render() {
    const { children, onClick } = this.props;

    return (
      <Label>
        <CodeStyled
          ref={this.createRef}
          onClick={onClick || this.onClickSelect}
        >
          {children}
        </CodeStyled>
      </Label>
    );
  }
}

export default Code;

const CodeStyled = styled.code`
  color: rgb(224, 57, 151);
`;
