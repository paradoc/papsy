import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Main.css';

const BlueButton = ({ disabled, text }) => (
  <button disabled={disabled} className="long-button">
    <span className="button-text">{text}</span>
  </button>
);

BlueButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

BlueButton.defaultProps = {
  disabled: false,
};

export default BlueButton;
