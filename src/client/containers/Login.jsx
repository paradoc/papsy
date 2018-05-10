import React from 'react';
import { Redirect } from 'react-router-dom';

import Dentist from '../assets/Dentist';
import BlueButton from '../components/BlueButton';

import '../styles/Main.css';

const buttonStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
};

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    invalid: false,
    authenticated: false,
  }

  getPassword = e => this.setState({ password: e.target.value, invalid: false });
  getUsername = e => this.setState({ username: e.target.value, invalid: false });

  authenticate = async () => {
    const { username, password } = this.state;
    const authenticate = await fetch(
      '/papsy/api/v1/authenticate',
      {
        body: JSON.stringify({ username, password }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      },
    );
    const data = await authenticate.json();

    if (data.length > 0) {
      const [{ id }] = data;
      sessionStorage.setItem('id', id);
      this.setState({ authenticated: true });
    }

    this.setState({ invalid: true });
  }

  render() {
    return (
      this.state.authenticated ?
        <Redirect to="/admin" /> :
        <div className="main-container">
          <div className="content-container">
            <div className="icon-container">
              <Dentist />
            </div>
            <div
              className="message-container"
              style={{
                width: '100%',
                height: '22%',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}
            >
              <input
                className="input-field"
                type="text"
                onChange={this.getUsername}
                placeholder="username"
              />
              <input
                className="input-field"
                type="password"
                onChange={this.getPassword}
                placeholder="password"
              />
            </div>
            <div style={buttonStyle}>
              <BlueButton text="login" onClick={this.authenticate} />
            </div>
            <div style={{ height: '2%' }}>
              {this.state.invalid &&
                <span style={{ color: '#F66059' }}>Invalid username and password!</span>}
            </div>
          </div>
        </div>
    );
  }
}

export default Login;
