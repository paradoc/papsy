import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import '../styles/Main.css';

const statusStyle = {
  width: '100%',
  color: 'red',
  fontSize: '1.6em',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  margin: '0.6em 0',
};

const backgroundStyle = {
  background: '#FFF',
  borderRadius: 8,
  boxShadow: '0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.11)',
  height: '85%',
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

const edit = {
  width: '25%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};

class View extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        secret: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    // data: {},
  }

  async componentWillMount() {
    const url = `/papsy/api/v1/appointments/${this.props.match.params.secret}`;
    console.log(url);
    // const appointment = await fetch(url);
    // const data = await appointment.json();
    // this.setState({ data });
  }

  render() {
    return (
      <div className="main-container">
        <div style={{ height: '15%', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#5F6F8E', fontWeight: 'bold', fontSize: '1.5em' }}>
            Appointment Details
          </span>
        </div>
        <div style={backgroundStyle}>
          <div style={statusStyle}>
            <span>PENDING</span>
          </div>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div style={info}>
              <span style={heading}>Schedule</span>
              <span style={text}>July 1, 1248 15:12:00</span>
            </div>
            <span style={edit}>edit</span>
          </div>

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div style={info}>
              <span style={heading}>Treatment</span>
              <span style={text}>Sample Operation</span>
            </div>
            <span style={edit}>edit</span>
          </div>

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div style={info}>
              <span style={heading}>Dentist</span>
              <span style={text}>Mark Johndy</span>
            </div>
            <span style={edit}>edit</span>
          </div>

          <div style={statusStyle}>
            <span>submit</span>
          </div>
          <div style={{ ...statusStyle, marginTop: '3.33em' }}>
            <span>cancel appointment</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(View);
