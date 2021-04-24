import React from 'react';
import { FC, useState, useCallback } from 'react';
import { Breadcrumb, Layout, Menu, Row, Col } from 'antd';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import BestCategory from '@components/BestCategory/inedx';
import { defaults } from 'react-chartjs-2';
defaults.global.defaultColor = 'red';
defaults.global.defaultFontColor = 'black';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  title: {
    text: 'Chart.js Time Scale',
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Home: FC<any> = () => {
  const [collapesd, setCollapesd] = useState(false);

  const onCollapse = useCallback(() => {
    setCollapesd((prev) => !prev);
  }, []);

  return (
    <Content>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapesd} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', backgroundColor: '#fff' }}>
          <Row gutter={[24, 32]}>
            <Col xs={24} md={12} xl={6} span={6} style={{ height: '200px' }}>
              <Bar data={data} width={100} height={50} options={options} />
            </Col>
            <Col xs={24} md={12} xl={6} span={6}>
              즐겨 찾기 구현
              <br />
              <BestCategory />
            </Col>
            <Col xs={24} md={12} xl={6} span={6}>
              Hello
            </Col>
            <Col xs={24} md={12} xl={6} span={6}>
              Hello
            </Col>
          </Row>
        </Content>
      </Layout>
    </Content>
  );
};

export default Home;
