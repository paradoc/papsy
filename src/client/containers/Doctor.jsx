import React from 'react';
import { Link } from 'react-router-dom';

import Dentist from '../assets/Dentist';
import RootCanal from '../assets/RootCanal';
import Back from '../assets/Back';
import '../styles/Main.css';

import context from '../context';

const iconContainerStyle = {
  width: '90%',
  alignItems: 'center',
};

const update = (id) => { context.doctor_id = id; };

class Doctor extends React.Component {
  wrapper = props => injected => WrappedComponent => (
    <Link to="/notify">
      <div
        className="icon-button"
        onKeyPress={() => {}}
        onClick={() => update(injected.id)}
        role="button"
        tabIndex={injected.id}
      >
        <WrappedComponent {...props} />
        <span>{injected.name}</span>
      </div>
    </Link>
  );

  render() {
    return (
      <div className="main-container">
        <div className="back-button-container">
          <Back />
        </div>
        <div className="content-container">
          <div className="message-container">
            <span style={{ color: '#5F6F8E' }}>
              Select your dentist
            </span>
          </div>
          <div className="icons-container" style={iconContainerStyle}>
            {this.wrapper()({ id: 1, name: 'ark' })(RootCanal)}
            {this.wrapper()({ id: 1, name: 'ark' })(RootCanal)}
          </div>
          <div style={{ opacity: 0.6, marginBottom: -42 }}>
            <Dentist />
          </div>
        </div>
      </div>
    );
  }
}

export default Doctor;
