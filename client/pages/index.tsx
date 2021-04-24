import React from 'react';
import routes from '@utils/route';
import { renderRoutes } from 'react-router-config';
import Meta from '@utils/Meta';
import { title, link, meta } from '../utils/assets';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Basic from '@layouts/Basic';
import User from '@pages/User';
import Usercar from '@pages/Usercar';

const App = () => {
  return (
    <div>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/admin/:admin" component={Basic} />
      </Switch>
    </div>
  );
};

export default App;
