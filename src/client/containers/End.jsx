import React from 'react';
import Loading from 'react-loading-spinkit';
import QRCode from 'qrcode.react';

import Back from '../assets/Back';
import context from '../context';

class End extends React.Component {
  state = {
    loading: true,
    confirmed: false,
    secret: '',
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

      const { secret } = await schedule.json();

      this.setState({ loading: false, confirmed: true, secret });
    } else {
      this.setState({ loading: false });
    }
  }

  getMessage() {
    if (this.state.confirmed) {
      return 'You may scan this code as your reference. Thank you!';
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
          <div
            className="message-container"
            style={{ flexDirection: 'column', height: '70%', justifyContent: 'space-evenly' }}
          >
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
            {this.state.secret !== '' ?
              <QRCode value={`http://mjcoprada.ga/papsy/#/view/${this.state.secret}`} />
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default End;
