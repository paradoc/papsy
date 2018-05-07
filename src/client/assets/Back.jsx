import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const textStyle = {
  marginLeft: '0.3em',
};

const buttonStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

const svgStyle = {
  fill: '#5F5F5F',
  enableBackground: 'new 0 0 456.339 456.339',
};

const Back = ({ history }) => (
  <div
    style={buttonStyle}
    onClick={history.goBack}
    onKeyPress={() => {}}
    role="button"
    tabIndex={0}
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 456.339 456.339"
      style={svgStyle}
      xmlSpace="preserve"
      height="1.4em"
      width="1.4em"
    >
      <g>
        <path d="M228.568,456.337c-59.259,0.007-117.968-22.905-161.816-66.749c-89.003-89.01-89.003-233.824,0-322.834 c89.003-89.003,233.831-89.003,322.834,0c89.003,89.01,89.003,233.824,0,322.834c-5.238,5.245-13.743,5.245-18.988,0 s-5.245-13.75,0-18.995c78.53-78.534,78.53-206.31,0-284.844c-78.534-78.534-206.317-78.54-284.858,0 c-78.53,78.534-78.53,206.31,0,284.844c63.661,63.658,162.83,77.31,241.168,33.2c6.473-3.658,14.656-1.343,18.289,5.112 c3.64,6.462,1.35,14.652-5.112,18.289C305.262,446.798,266.796,456.337,228.568,456.337z" />
        <path d="M258.76,334.044c-3.437,0-6.871-1.308-9.494-3.931l-93.014-93.018c-2.518-2.518-3.934-5.938-3.934-9.498 c0-3.56,1.416-6.98,3.934-9.498l93.014-93.011c5.238-5.245,13.743-5.245,18.988,0s5.245,13.75,0,18.995l-83.517,83.513 l83.517,83.52c5.245,5.245,5.245,13.75,0,18.995C265.635,332.736,262.198,334.044,258.76,334.044z" />
      </g>
    </svg>
    <span style={textStyle}>back</span>
  </div>
);

Back.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Back);
