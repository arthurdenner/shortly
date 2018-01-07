import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import LinkRedirect from './components/LinkRedirect';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './Home';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route
        path="/:hash"
        render={({ match: { params: { hash } } }) => (
          <LinkRedirect hash={hash} />
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
