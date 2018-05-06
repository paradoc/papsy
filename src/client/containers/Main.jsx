import React from 'react';
import Loading from 'react-loading-spinkit';
import { Redirect } from 'react-router-dom';

import Landing from '../assets/Landing';
import '../styles/Main.css';

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

class Main extends React.Component {
  state = {
    redirect: false,
  }

  async componentWillMount() {
    await delay(2000);
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/start" />;
    }

    return (
      <div className="main-container">
        <div className="text-container">
          <span className="title">PApSy</span>
          <span className="subtitle">Patient Appointment System</span>
        </div>
        <div className="icon-container">
          <Landing />
        </div>
        <div className="text-container">
          <Loading name="ball-pulse-sync" color="#849FC4" show className="loader" />
          <span className="subtitle pastel">
            loading milk teeth..
          </span>
        </div>
      </div>
    );
  }
}

export default Main;
