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
import Login from './Login';
import Admin from './Admin';
import View from './View';

import '../styles/App.css';

import context from '../context';

const checkTreatment = () => (context.treatment_id !== 0 ? <Schedule /> : <Redirect to="/treatment" />);
const checkSchedule = () => (context.schedule_from !== '' ? <Doctor /> : <Redirect to="/schedule" />);
const checkDoctor = () => (context.doctor_id !== 0 ? <Notify /> : <Redirect to="/doctor" />);
const checkNotify = () => (context.contact !== '' ? <End /> : <Redirect to="/notify" />);
const checkLogin = Component => (
  sessionStorage.getItem('id') !== null ? <Component /> : <Redirect to="/login" />
);
const checkSession = Component => (
  sessionStorage.getItem('id') === null ? <Component /> : <Redirect to="/admin" />
);

const App = () => (
  <HashRouter hashType="slash">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/start" component={Start} />
      <Route path="/register" component={Register} />
      <Route path="/treatment" component={Treatment} />
      <Route path="/schedule" component={checkTreatment} />
      <Route path="/doctor" component={checkSchedule} />
      <Route path="/notify" component={checkDoctor} />
      <Route path="/end" component={checkNotify} />
      <Route path="/admin" render={() => checkLogin(Admin)} />
      <Route path="/login" render={() => checkSession(Login)} />
      <Route exact path="/view/:secret" component={View} />
      <Route render={() => <div>Not found!</div>} />
    </Switch>
  </HashRouter>
);

export default App;
