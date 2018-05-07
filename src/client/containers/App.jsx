import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Start from './Start';
import Register from './Register';

import '../styles/App.css';

const App = () => (
  <HashRouter hashType="slash">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/start" component={Start} />
      <Route path="/register" component={Register} />
    </Switch>
  </HashRouter>
);

export default App;
