import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import Back from '../assets/Back';
import BlueButton from '../components/BlueButton';
import IconButton from '../components/IconButton';

import '../styles/Main.css';

import context from '../context';

class Treatment extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      block: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    treatments: [],
  }

  async componentWillMount() {
    const treatments = await fetch('/papsy/api/v1/treatments');
    const data = await treatments.json();
    this.setState({ treatments: data });
  }

  componentDidMount() {
    this.unblock = this.props.history.block(() => context.treatment_id !== 0);
  }

  componentWillUnmount() {
    this.unblock();
  }

  render() {
    return (
      <div className="main-container">
        <div className="back-button-container">
          <Back />
        </div>
        <div className="content-container">
          <div className="message-container">
            <span style={{ color: '#5F6F8E' }}>What will you be availing?</span>
          </div>
          <div className="icons-container">
            {this.state.treatments.map(t => <IconButton data={t} />)}
          </div>
          <Link to="/schedule">
            <BlueButton text="next" />
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Treatment);
