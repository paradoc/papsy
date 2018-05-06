import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Main.css';

const BlueButton = ({ text }) => (
  <button className="long-button">
    <span className="button-text">{text}</span>
  </button>
);

BlueButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BlueButton;
