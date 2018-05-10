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
    selectedTime: '',
    ok: false,
    options: [
      { value: '09:00:00', label: '9:00 am', disabled: false },
      { value: '10:00:00', label: '10:00 am', disabled: false },
      { value: '11:00:00', label: '11:00 am', disabled: false },
      { value: '13:00:00', label: '1:00 pm', disabled: false },
      { value: '14:00:00', label: '2:00 pm', disabled: false },
      { value: '15:00:00', label: '3:00 pm', disabled: false },
      { value: '16:00:00', label: '4:00 pm', disabled: false },
      { value: '17:00:00', label: '5:00 pm', disabled: false },
      { value: '18:00:00', label: '6:00 pm', disabled: false },
    ],
  }

  setValue = (selectedTime) => {
    const selectedDateTime = `${moment(this.state.date).format('YYYY-MM-DD')} ${selectedTime.value}`;
    context.schedule_from = selectedDateTime;
    this.setState({
      ...this.state,
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

  reset = () => {
    const options = this.state.options.map(option => (
      { ...option, disabled: false }
    ));

    this.setState({
      selectedTime: '',
      selectedDateTime: '',
      ok: false,
      options,
    });
  }

  sunday = day => day.getDay() === 0;

  updateOptions = () => {
    const date = moment(this.state.date).format('YYYY-MM-DD');

    this.fetchSchedules(date).then((schedules) => {
      const options = this.state.options.map((option) => {
        const filteredOption = option;
        const selectedString = `${date} ${filteredOption.value}`;
        const selected = moment(selectedString).format('YYYY-MM-DD HH:mm:ss');
        const now = moment().format('YYYY-MM-DD HH:mm:ss');

        if (schedules.includes(option.value) || (selected < now)) {
          filteredOption.disabled = true;
        }

        return filteredOption;
      });

      this.setState({ options });
    });
  }

  fetchSchedules = async (date) => {
    const url = `/papsy/api/v1/appointments?on=${date}&s=confirmed`;
    const data = await fetch(url);
    const appointments = await data.json();

    const confirmedSchedules = appointments.filter(d => d.status === 'confirmed')
      .map((d) => {
        const [, time] = d.schedule_from.split(' ');
        return time;
      });

    return confirmedSchedules;
  }

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
            hideOnOverlayClicked
            ref={(ref) => { this.modal = ref; }}
            dialogStyles={styles}
            title="Select a timeslot"
            beforeClose={this.reset}
          >
            <Select
              options={this.state.options}
              autosize={false}
              onChange={this.setValue}
              value={this.state.selectedTime}
              onOpen={this.updateOptions}
            />
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
