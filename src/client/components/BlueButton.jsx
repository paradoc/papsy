import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Main.css';

const BlueButton = ({
  disabled,
  text,
  onClick,
  style,
}) => (
  <button
    disabled={disabled}
    className="long-button"
    onClick={onClick}
    style={style}
  >
    <span className="button-text">{text}</span>
  </button>
);

BlueButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({
    background: PropTypes.string,
  }),
};

BlueButton.defaultProps = {
  disabled: false,
  onClick: () => {},
  style: {},
};

export default BlueButton;
