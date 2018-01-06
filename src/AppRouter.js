import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import LinkRedirect from './components/LinkRedirect';
import Home from './Home';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
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
