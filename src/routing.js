import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/register/register';
import Dashboard from './components/dashboard';

export const routing = (
    <Router>
      <Switch>
        <Route exact path="/(|login)" component={Login} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
)