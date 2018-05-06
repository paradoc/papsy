import React from 'react';
import Loading from 'react-loading-spinkit';

import '../styles/Main.css';

const Returning = () => (
  <div className="main-container">
    <div className="text-container">
      <span className="title">PApSy</span>
      <span className="subtitle">Patient Appointment System</span>
    </div>
    <div className="icon-container">
      a
    </div>
    <div className="text-container">
      <Loading name="ball-pulse-sync" color="#849FC4" show className="loader" />
      <span className="subtitle" style={{ color: '#849FC4' }}>
        loading milk teeth..
      </span>
    </div>
  </div>
);

export default Returning;
