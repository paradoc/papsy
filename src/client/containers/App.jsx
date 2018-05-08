import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Start from './Start';
import Register from './Register';
import Treatment from './Treatment';
import Schedule from './Schedule';
import Doctor from './Doctor';
import Notify from './Notify';

import '../styles/App.css';

const App = () => (
  <HashRouter hashType="slash">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/start" component={Start} />
      <Route path="/register" component={Register} />
      <Route path="/treatment" component={Treatment} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/doctor" component={Doctor} />
      <Route path="/notify" component={Notify} />
    </Switch>
  </HashRouter>
);

export default App;
