import React from 'react';
import { Link } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import SkyLight from 'react-skylight';
import Select from 'react-select';
import moment from 'moment';

import 'react-day-picker/lib/style.css';
import 'react-select/dist/react-select.css';
import BlueButton from '../components/BlueButton';
import Back from '../assets/Back';
import '../styles/Main.css';

import context from '../context';

const styles = {
  marginLeft: '-42%',
  marginRight: '10%',
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '200px',
  alignItems: 'center',
};

class Schedule extends React.Component {
  state = {
    date: new Date(),
    selectedDateTime: '',
    selectedTime: '',
    ok: false,
  }

  getOptions = (date) => {
    const selectedDate = moment(date).format('YYYY-MM-DD');
    const options = [
      { value: '09:00', label: '9:00 AM', disabled: false },
      { value: '10:00', label: '10:00 AM', disabled: false },
      { value: '11:00', label: '11:00 AM', disabled: false },
      { value: '13:00', label: '1:00 PM', disabled: false },
      { value: '14:00', label: '2:00 PM', disabled: false },
      { value: '15:00', label: '3:00 PM', disabled: false },
      { value: '16:00', label: '4:00 PM', disabled: false },
      { value: '17:00', label: '5:00 PM', disabled: false },
      { value: '18:00', label: '6:00 PM', disabled: false },
    ];

    // TODO(paradoc): fetch from backend
    const fetchedSchedules = ['13:00', '15:00'];
    const filteredOptions = options.map((option) => {
      const filteredOption = option;

      if (fetchedSchedules.includes(option.value) ||
          (moment(`${selectedDate} ${option.value}`).format('YYYY-MM-DD HH:mm') < moment().format('YYYY-MM-DD HH:mm'))) {
        filteredOption.disabled = true;
      }
      return filteredOption;
    });

    if (filteredOptions.filter(({ disabled }) => disabled === false).length > 0) {
      return (
        <Select
          options={filteredOptions}
          autosize={false}
          onChange={this.setValue}
          value={this.state.selectedTime}
        />
      );
    }

    return (
      <div>
        <p>Sorry.</p>
        <p>There are no more available timeslots for this day.</p>
      </div>
    );
  }

  setValue = (selectedTime) => {
    const selectedDateTime = `${moment(this.state.date).format('YYYY-MM-DD')} ${selectedTime.value}`;
    context.schedule_from = selectedDateTime;
    this.setState({
      ...this.state,
      selectedDateTime,
      selectedTime,
      ok: true,
    });
  }

  handleDayClick = (date, { sunday, disabled }) => {
    if (!sunday && !disabled) {
      this.reset();
      this.setState({ date });
      this.modal.show();
    }
  }

  reset = () => this.setState({ selectedTime: '', selectedDateTime: '', ok: false });

  checkInput = () => { console.log(this.state); };

  sunday = day => day.getDay() === 0;

  render() {
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
          <DayPicker
            className="calendar"
            onDayClick={this.handleDayClick}
            disabledDays={[this.sunday, { before: new Date() }]}
          />
          <SkyLight
            ref={(ref) => { this.modal = ref; }}
            dialogStyles={styles}
            title="Select a timeslot"
          >
            {this.getOptions(this.state.date)}
            <div className="button-container">
              <Link to="/doctor">
                <BlueButton disabled={!this.state.ok} text="proceed" />
              </Link>
            </div>
          </SkyLight>
        </div>
      </div>
    );
  }
}

export default Schedule;
