import React from 'react';

import Back from '../assets/Back';
import IconButton from '../components/IconButton';

import '../styles/Main.css';

class Treatment extends React.Component {
  state = {
    treatments: [],
  }

  async componentWillMount() {
    const treatments = await fetch('/papsy/api/v1/treatments');
    const data = await treatments.json();
    this.setState({ treatments: data });
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
              Which treatment will you be availing?
            </span>
          </div>
          <div className="icons-container">
            {this.state.treatments.map(t => <IconButton data={t} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Treatment;
