import * as React from "react"
import {useState , useCallback} from "react";
import { Layout, Menu, Breadcrumb , Row,Col } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import {Doughnut ,defaults, Bar} from "react-chartjs-2"
import BestCategory from "@components/BestCategory/inedx";
// defaults.global.animation = true;
defaults.global.defaultColor = 'red';
defaults.global.defaultFontColor = 'black';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Basic:React.FC = () =>{
    console.log(defaults, 'defaults>>');
    const [collapesd , setCollapesd] = useState(false)
    const onCollapse = useCallback(()=>{
        console.log(collapesd)
        setCollapesd((prev) => !prev);
    },[])
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
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
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
                  즐겨 찾기 구현<br/>
                  <BestCategory/>
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
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
}

export default Basic;