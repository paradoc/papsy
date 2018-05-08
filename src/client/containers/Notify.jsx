import React from 'react';
import { Link } from 'react-router-dom';

import BlueButton from '../components/BlueButton';
import Back from '../assets/Back';
import '../styles/Main.css';

import context from '../context';


class Notify extends React.Component {
  state = {
    input: '',
    isInvalid: true,
  }

  componentDidMount() {
    console.log(context);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isInvalid !== this.state.isInvalid) {
      return true;
    }

    return false;
  }

  handleChange = (e) => {
    // this.setState({ input: e.target.value });
    // console.log(e.target.value, this.state.input);
    this.validate(e.target.value);
  }

  validate(input) {
    const mobile = /^[0-9]{11}$/;

    // TODO: add email regex
    if (input.match(mobile)) {
      this.setState({ input, isInvalid: false });
    } else {
      this.setState({ input: '', isInvalid: true });
    }
  }

  render() {
    console.log(this.state.input);
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
          <div>
            <input type="text" onChange={this.handleChange} />
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
