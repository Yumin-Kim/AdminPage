import { RouteConfig } from 'react-router-config';
import Login from '@pages/Login';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Basic from '@layouts/Basic';
import { Redirect } from 'react-router';
import User from '@pages/User';
import Usercar from '@pages/Usercar';
const routes: RouteConfig[] = [
  {
    component: Basic as React.ComponentType,
    routes: [
      {
        path: '/admin/main',
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
        path: '/admin/user',
        component: User,
        name: 'User',
      },
      {
        path: '/admin/usercar',
        component: Usercar,
        name: 'Usercar',
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
