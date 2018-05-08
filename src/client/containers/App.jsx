import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Start from './Start';
import Register from './Register';
import Treatment from './Treatment';
import Schedule from './Schedule';
import Doctor from './Doctor';
import Notify from './Notify';
import End from './End';

import '../styles/App.css';

import context from '../context';

const checkTreatment = () => (context.treatment_id !== 0 ? <Schedule /> : <Redirect to="/treatment" />);
const checkSchedule = () => (context.schedule_from !== '' ? <Doctor /> : <Redirect to="/schedule" />);
const checkDoctor = () => (context.doctor_id !== 0 ? <Notify /> : <Redirect to="/doctor" />);
// const checkNotify = () => (context.contact !== '' ? <End /> : <Redirect to="/notify" />);

const App = () => (
  <HashRouter hashType="slash">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/start" component={Start} />
      <Route path="/register" component={Register} />
      <Route path="/treatment" component={Treatment} />
      <Route path="/schedule" render={checkTreatment} />
      <Route path="/doctor" component={checkSchedule} />
      <Route path="/notify" component={checkDoctor} />
      {/* <Route path="/end" component={checkNotify} /> */}
      <Route path="/end" component={End} />
    </Switch>
  </HashRouter>
);

export default App;
