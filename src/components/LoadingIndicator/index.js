/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

function LoadingIndicator() {
  return <Loader active inline="centered" />;
}

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
