/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

class LoadingIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { ms: 0 };
    this.interval = undefined;
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        ms: prevState.ms + 1,
      }));
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { ms } = this.state;

    return (
      <Loader active inline="centered">
        {ms}
      </Loader>
    );
  }
}

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
