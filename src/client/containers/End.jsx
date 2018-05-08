import React from 'react';
import Loading from 'react-loading-spinkit';

import Back from '../assets/Back';
import context from '../context';

class End extends React.Component {
  state = {
    loading: true,
    confirmed: false,
  }

  componentWillMount() {
    this.getPatientDetails();
  }

  getPatientDetails = async () => {
    const patients = await fetch(`/papsy/api/v1/patients?c=${context.contact}`);
    const data = await patients.json();

    if (data.length > 0) {
      // Create an appointment.
      const [{ id }] = data;
      const schedule = await fetch(
        '/papsy/api/v1/appointments',
        {
          body: JSON.stringify({ ...context, patient_id: id }),
          headers: { 'content-type': 'application/json' },
          method: 'POST',
        },
      );

      // TODO: make something out of this (i.e. QR code)
      const { secret } = await schedule.json();
      console.log(secret);

      this.setState({ loading: false, confirmed: true });
    } else {
      this.setState({ loading: false });
    }
  }

  getMessage() {
    if (this.state.confirmed) {
      return 'Done!';
    }

    return 'I am unable to find you in our records';
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
              {this.state.loading &&
                <Loading
                  name="ball-pulse-sync"
                  color="#849FC4"
                  show
                  className="loader"
                />}
              {!this.state.loading && this.getMessage()}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default End;
