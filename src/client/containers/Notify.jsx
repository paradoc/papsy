import React from 'react';
import { Link } from 'react-router-dom';

import BlueButton from '../components/BlueButton';
import Back from '../assets/Back';
import '../styles/Main.css';

import context from '../context';


class Notify extends React.Component {
  state = {
    isInvalid: true,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isInvalid !== this.state.isInvalid) {
      return true;
    }

    return false;
  }

  handleChange = (e) => {
    this.validate(e.target.value);
  }

  validate(input) {
    const mobile = /^[0-9]{11}$/;

    // TODO: add email regex
    if (input.match(mobile)) {
      context.contact = input;
      this.setState({ isInvalid: false });
    } else {
      context.contact = '';
      this.setState({ isInvalid: true });
    }
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
              Please input your mobile number or email address
            </span>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <input
              className="input-field"
              type="text"
              onChange={this.handleChange}
              placeholder="09171234567"
            />
          </div>
          <div className="button-container">
            <Link to="/end">
              <BlueButton disabled={this.state.isInvalid} text="submit" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Notify;
