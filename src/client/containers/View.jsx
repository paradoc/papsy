import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import SkyLight from 'react-skylight';
import Select from 'react-select';

import Edit from '../assets/Edit';
import BlueButton from '../components/BlueButton';
import IconButton from '../components/IconButton';
import '../styles/Main.css';

const modalStyle = {
  marginLeft: '-42%',
  marginRight: '10%',
  width: '78%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '320px',
  alignItems: 'center',
};

const statusStyle = {
  width: '100%',
  color: '#F66059',
  fontSize: '1.6em',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  margin: '0.3em 0',
};

const backgroundStyle = {
  background: '#FFF',
  borderRadius: 8,
  boxShadow: '0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.11)',
  height: '70%',
  width: '85%',
  marginBottom: '2em',
};

const heading = {
  opacity: 0.87,
  fontSize: '1.33em',
  fontWeight: 'bold',
};
const info = {
  display: 'flex',
  width: '75%',
  flexDirection: 'column',
  marginTop: '0.6em',
  marginLeft: '0.6em',
};

const text = {
  opacity: 0.53,
};

const rawDateToReadableDate = d => moment(d).format('MMM DD, YYYY h:mm A');

class View extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        secret: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    data: {
      patient_id: 0,
      doctor_id: 0,
      treatment_id: 0,
      status: '',
      schedule_from: '',
      treatment: {
        name: '',
      },
      doctor: {
        name: '',
      },
    },
    selectedDay: null,
    selectedTime: '',
    selectDisabled: true,
    isValidDate: false,
    treatments: [],
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

  componentWillMount() {
    this.getAppointmentData();
    this.getTreatments();
  }

  onCancel = async () => {
    const confirmed = window.confirm('Click OK to cancel your appointment.');
    if (confirmed) {
      await fetch(`/papsy/api/v1/appointments/${this.state.data.id}/cancel`)
        .then(() => <Redirect to="/" />);
    }
  }

  onSubmit = () => {
    const { secret } = this.props.match.params;
    const data = {
      doctor_id: this.state.data.doctor_id,
      treatment_id: this.state.data.treatment_id,
      schedule_from: moment(this.state.data.schedule_from).format('YYYY-MM-DD HH:mm:ss'),
      secret,
    };
    this.patch(data).then(() => {
      window.confirm('Your appointment request has been updated.');
      this.getAppointmentData();
    });
  }

  getAppointmentData = async () => {
    const { secret } = this.props.match.params;
    const url = `/papsy/api/v1/appointments/edit/${secret}`;
    const [data] = await fetch(url).then(d => d.json());

    this.setState({ data });
  }

  getTreatments = async () => {
    const treatments = await fetch('/papsy/api/v1/treatments').then(d => d.json());
    this.setState({ ...this.state, treatments });
  }

  setDateTime = (selectedTime) => {
    const selectedDateTime = `${moment(this.state.selectedDay).format('YYYY-MM-DD')} ${selectedTime.value}`;
    this.setState({
      ...this.state,
      selectedTime,
      isValidDate: true,
      data: {
        ...this.state.data,
        schedule_from: rawDateToReadableDate(selectedDateTime),
      },
    });
  }

  setTreatment = (treatment) => {
    this.setState({ selectedTreatment: treatment });
  }

  reset = () => {
    this.setState({
      ...this.state,
      selectedDay: null,
      selectedTreatment: '',
      selectedTime: '',
      selectDisabled: false,
    });
  }

  patch = async (data) => {
    const url = `/papsy/api/v1/appointments/${this.state.data.id}`;
    await fetch(
      url,
      {
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
        method: 'PATCH',
      },
    );
  }

  fetchSchedules = async (date) => {
    const url = `/papsy/api/v1/appointments/view/all?on=${date}&s=confirmed`;
    const data = await fetch(url);
    const appointments = await data.json();

    const confirmedSchedules = appointments.filter(d => d.status === 'confirmed')
      .map((d) => {
        const [, time] = d.schedule_from.split(' ');
        return time;
      });

    return confirmedSchedules;
  }


  handleDayClick = (date, { sunday, disabled }) => {
    if (!sunday && !disabled) {
      this.setState({ selectedDay: date, selectDisabled: false });
    }
  }

  showDentists = () => this.dentistModal.show();
  showTreatments = () => this.treatmentModal.show();
  showDatepicker = () => this.dateModal.show();

  updateOptions = () => {
    const date = moment(this.state.selectedDay).format('YYYY-MM-DD');

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

  updateTreatment = (id) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        treatment_id: id,
        treatment: this.state.treatments.filter(t => t.id === id)[0],
      },
    });
  };

  updateDoctor = ({ id, name }) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        doctor_id: id,
        doctor: { name },
      },
    });
  };

  render() {
    return (
      <div className="main-container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '2em',
        }}
        >
          <span style={{ color: '#5F6F8E', fontWeight: 'bold', fontSize: '1.5em' }}>
            Appointment Details
          </span>
        </div>
        <div style={backgroundStyle}>
          <div style={statusStyle}>
            <span>{this.state.data.status}</span>
          </div>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div style={info}>
              <span style={heading}>Schedule</span>
              <span style={text}>{rawDateToReadableDate(this.state.data.schedule_from)}</span>
            </div>
            <Edit className="edit" onClick={this.showDatepicker} />
            <SkyLight
              hideOnOverlayClicked
              ref={(ref) => { this.dateModal = ref; }}
              dialogStyles={modalStyle}
              title="When would it be?"
              beforeClose={this.onDateClose}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
                <DayPicker
                  className="calendar"
                  selectedDays={this.state.selectedDay}
                  onDayClick={this.handleDayClick}
                  disabledDays={[this.sunday, { before: new Date() }]}
                />
                <Select
                  className="select"
                  disabled={this.state.selectDisabled}
                  style={{ marginTop: '1.33em' }}
                  clearable={false}
                  options={this.state.options}
                  autosize={false}
                  searchable={false}
                  onChange={this.setDateTime}
                  value={this.state.selectedTime}
                  onOpen={this.updateOptions}
                />
              </div>
              <BlueButton
                text="update"
                disabled={!this.state.isValidDate}
                style={{ height: 36, marginTop: '1.33em' }}
                onClick={() => this.dateModal.hide()}
              />
            </SkyLight>
          </div>

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div style={info}>
              <span style={heading}>Treatment</span>
              <span style={text}>{this.state.data.treatment.name}</span>
            </div>
            <Edit className="edit" onClick={this.showTreatments} />
            <SkyLight
              ref={(ref) => { this.treatmentModal = ref; }}
              dialogStyles={modalStyle}
              title="What will you avail?"
              beforeClose={this.onTreatmentClose}
            >
              <div className="icons-container">
                {this.state.treatments.map((t, i) => (
                  <IconButton
                    onClick={() => this.updateTreatment(i + 1)}
                    noRedirect
                    data={t}
                  />))}
              </div>
              <BlueButton
                text="update"
                style={{ height: 36, marginTop: '1.33em' }}
                onClick={() => this.treatmentModal.hide()}
              />
            </SkyLight>
          </div>

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div style={info}>
              <span style={heading}>Dentist</span>
              <span style={text}>{this.state.data.doctor.name}</span>
            </div>
            <Edit className="edit" onClick={this.showDentists} />
            <SkyLight
              hideOnOverlayClicked
              ref={(ref) => { this.dentistModal = ref; }}
              dialogStyles={modalStyle}
              title="Who will be your dentist?"
            >
              <div
                className="icon-button"
                onKeyPress={() => {}}
                onClick={() => this.updateDoctor({ id: 1, name: 'Mark' })}
                role="button"
                tabIndex="0"
              >
                <img
                  height="72"
                  width="72"
                  style={{ borderRadius: '50%' }}
                  alt="profile_photo"
                  src="https://yt3.ggpht.com/-IOF4hx2TmRQ/AAAAAAAAAAI/AAAAAAAAAEw/WPeNbh600Xk/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg"
                />
                <span>Mark</span>
              </div>
              <BlueButton
                text="update"
                style={{ height: 36, marginTop: '1.33em' }}
                onClick={() => this.dentistModal.hide()}
              />
            </SkyLight>
          </div>
          <div
            className="button-container"
            style={{ height: 128, alignItems: 'center', marginTop: '1em' }}
          >
            <BlueButton
              text="submit"
              onClick={this.onSubmit}
            />
            <BlueButton
              text="cancel"
              style={{ background: '#F66059' }}
              onClick={this.onCancel}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(View);
