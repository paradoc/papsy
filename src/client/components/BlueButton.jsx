import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Main.css';

const BlueButton = ({ disabled, text, onClick }) => (
  <button disabled={disabled} className="long-button" onClick={onClick}>
    <span className="button-text">{text}</span>
  </button>
);

BlueButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

BlueButton.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default BlueButton;
