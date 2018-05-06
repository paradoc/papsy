import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BlueButton from '../components/BlueButton';
import '../styles/Main.css';

const Start = () => (
  <div className="main-container">
    <div className="text-container">
      <span className="title">hello</span>
      <span className="subtitle">world</span>
    </div>
    <div className="icon-container">
      are you a returning patient?
    </div>
    <div className="button-container">
      <Link to="/step/2"><BlueButton text="yes" /></Link>
      <Link to="/register"><BlueButton text="no" /></Link>
    </div>
  </div>
);

export default Start;
