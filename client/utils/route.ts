import { RouteConfig } from 'react-router-config';
import Login from '@pages/Login';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Basic from '@layouts/Basic';
import { Redirect } from 'react-router';
const routes: RouteConfig[] = [
  {
    component: Basic as React.ComponentType,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home',
      },
      {
        path: '/login',
        component: Login,
        name: 'Login',
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
