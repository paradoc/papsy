import React from 'react';
import { Redirect } from 'react-router-dom';

import Logout from '../assets/Logout';
import Confirm from '../assets/Confirm';
import Reject from '../assets/Reject';
import '../styles/Main.css';

const baseUrl = '/papsy/api/v1/appointments';

const listStyle = {
  height: '85%',
  width: '100%',
  overflowY: 'auto',
};

const flexCol = {
  display: 'flex',
  flexDirection: 'column',
};

const scheduleStyle = {
  fontSize: 12,
};

const treatmentStyle = {
  fontSize: 12,
  color: '#000000',
  opacity: 0.54,
};

const itemStyle = {
  height: '3.3em',
  fontSize: '1.1em',
  display: 'flex',
  alignItems: 'center',
  background: '#FFF',
  color: '#202124',
  width: '100%',
  justifyContent: 'space-between',
};

class Admin extends React.Component {
  state = {
    requests: [],
    id: sessionStorage.getItem('id'),
  }

  componentWillMount() {
    this.getAppointments();
  }

  getAppointments = async () => {
    const appointments = await fetch(`${baseUrl}?d=${this.state.id}&s=requested`);
    const requests = await appointments.json();

    this.setState({ requests });
  }

  logout = () => {
    sessionStorage.clear();
    this.setState({ id: null });
  }

  // TODO: get joined table

  async confirmAppointment(id) {
    await fetch(`${baseUrl}/${id}/confirm`, { method: 'PATCH' });
    this.getAppointments();
  }

  async rejectAppointment(id) {
    await fetch(`${baseUrl}/${id}/reject`, { method: 'PATCH' });
    this.getAppointments();
  }

  render() {
    return (
      this.state.id !== null ?
        <div className="main-container">
          <div style={{
            height: '10%',
            display: 'flex',
            alignItems: 'center',
            width: '90%',
            justifyContent: 'space-between',
          }}
          >
            <span style={{ color: '#5F6F8E', fontWeight: 'bold' }}>
              {this.state.requests.length} pending requests
            </span>
            <div
              role="button"
              onClick={this.logout}
              tabIndex="0"
              onKeyUp={() => {}}
              style={{ display: 'flex', cursor: 'pointer' }}
            >
              <Logout />
            </div>
          </div>
          <div style={listStyle}>
            {this.state.requests.map(request => (
              <div style={itemStyle} className="item">
                <div style={{ ...flexCol, width: '70%', marginLeft: '0.4em' }}>
                  <span>{request.name}</span>
                  <span style={scheduleStyle}>{request.schedule}</span>
                  <span style={treatmentStyle}>{request.treatment_id}</span>
                </div>
                <div style={{ width: '30%', display: 'flex', justifyContent: 'space-evenly' }}>
                  <div
                    style={{ display: 'flex', cursor: 'pointer' }}
                    onClick={() => this.rejectAppointment(request.id)}
                    onKeyUp={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <Reject />
                  </div>
                  <div
                    style={{ display: 'flex', cursor: 'pointer' }}
                    onClick={() => this.confirmAppointment(request.id)}
                    onKeyUp={() => {}}
                    role="button"
                    tabIndex="0"
                  >
                    <Confirm />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        : <Redirect to="/login" />
    );
  }
}

export default Admin;
