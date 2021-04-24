import React from 'react';
import { Menu } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

const Nav: FC<RouteConfig> = ({ routeData }) => {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {routeData &&
          routeData.map((value: any, index: any) => {
            if (value.path && typeof value.name !== 'undefined')
              return (
                <Menu.Item key={`${index}`}>
                  <Link to={value.path}>{value.name}</Link>
                </Menu.Item>
              );
          })}
        <Menu.Item key="3">
          <Link to="/admin/user">User</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/admin/usercar">UserCar</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Nav;
