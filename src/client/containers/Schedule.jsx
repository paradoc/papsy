import React from 'react';
import DayPicker from 'react-day-picker';
import SkyLight from 'react-skylight';

import 'react-day-picker/lib/style.css';
import Back from '../assets/Back';
import '../styles/Main.css';

const styles = {
  marginLeft: '-42%',
  marginRight: '10%',
  width: '75%',
};

class Schedule extends React.Component {
  state = {
    date: new Date(),
  }

  render() {
    console.log(this.state.date);
    const displayModal = (date) => {
      this.setState({ date });
      this.modal.show();
    };
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
          <DayPicker className="calendar" onDayClick={displayModal} />
          <SkyLight
            ref={(ref) => { this.modal = ref; }}
            dialogStyles={styles}
            title="Select a timeslot"
          />
        </div>
      </div>
    );
  }
}

export default Schedule;
