import React from 'react';
import { Link } from 'react-router-dom';

import Baby from '../assets/Baby';
import BlueButton from '../components/BlueButton';
import '../styles/Main.css';

const Start = () => (
  <div className="main-container">
    <div className="icon-container">
      <Baby />
    </div>
    <div className="message-container">
      <span>Are you a new patient?</span>
    </div>
    <div className="button-container">
      <Link to="/register"><BlueButton text="yes" /></Link>
      <Link to="/step/2"><BlueButton text="no" /></Link>
    </div>
  </div>
);

export default Start;
