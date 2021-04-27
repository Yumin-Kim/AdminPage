import React from 'react';
import Meta from '@utils/Meta';
import { title, link, meta } from '../utils/assets';
import { Switch, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Login = loadable(() => import('../pages/Login'));
const Basic = loadable(() => import('../layouts/Basic'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/admin/:admin" component={Basic} />
    </Switch>
  );
};

export default App;
