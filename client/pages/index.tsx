import React from 'react';
import Meta from '@utils/Meta';
import { title, link, meta } from '../utils/assets';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '@pages/Login';
import Basic from '@layouts/Basic';
import NotFound from '@pages/NotFound';

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/admin/:admin" component={Basic} />
      <Route path="*" component={NotFound} />
      {/* <Route exact path="/" component={Basic} /> */}
      {/* {renderRoutes(routes)} */}
    </Switch>
  );
};

export default App;
