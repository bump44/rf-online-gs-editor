/**
 *
 * LoadingIndicator
 *
 */

import { Loader } from 'semantic-ui-react';
import React from 'react';

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
