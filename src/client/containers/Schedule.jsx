import React from 'react';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import Back from '../assets/Back';
import '../styles/Main.css';

class Schedule extends React.Component {
  state = {
    date: new Date(),
  }

  onChange(date) {
    this.setState({ date });
  }

  render() {
    console.log(this.state.date);
    return (
      <div className="main-container">
        <div className="back-button-container">
          <Back />
        </div>
        <div className="content-container">
          <div className="message-container">
            <span style={{ color: '#5F6F8E' }}>
              Select your desired appointment schedule
            </span>
          </div>
          <DayPicker className="calendar" />
        </div>
      </div>
    );
  }
}

export default Schedule;
