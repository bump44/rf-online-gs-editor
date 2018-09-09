/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function LoadingIndicator() {
  return (
    <div className="has-text-centered p-10">
      <i className="fas fa-spin fa-spinner fa-3x" />
    </div>
  );
}

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
