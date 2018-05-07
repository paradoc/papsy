import React from 'react';

import BlueButton from '../components/BlueButton';
import Back from '../assets/Back';
import Mobile from '../assets/Mobile';
import '../styles/Main.css';

const Register = () => (
  <div className="main-container">
    <div className="back-button-container">
      <Back />
    </div>
    <div className="icon-container">
      <Mobile />
    </div>
    <div className="message-container">
      <span>Please contact the clinic for registration</span>
    </div>
    <div className="button-container">
      <a href="tel:#8-7000"><BlueButton text="call" /></a>
    </div>
  </div>
);

export default Register;
