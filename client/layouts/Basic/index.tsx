import * as React from 'react';
import { Layout } from 'antd';
import { RouteConfig, renderRoutes } from 'react-router-config';
import { Switch, Route } from 'react-router-dom';
import Nav from '@layouts/Nav';
import Login from '@pages/Login';
import Home from '@pages/Home';
import routes from '@utils/route';
import { useLocation } from 'react-router';
import Usercar from '@pages/Usercar';
import User from '@pages/User';

const { Header, Footer } = Layout;

interface Basic {
  route: RouteConfig;
}

const Basic: React.FC<Basic> = () => {
  let { pathname } = useLocation();
  console.log(location);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Nav routeData={routes[0].routes} />
      </Header>
      <Switch>
        <Route path="/admin/main" component={Home} />
        <Route path="/admin/usercar" component={Usercar} />
        <Route path="/admin/user" component={User} />
      </Switch>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default Basic;
