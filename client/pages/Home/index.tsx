import React from 'react';
import { FC, useState, useCallback } from 'react';
import { Breadcrumb, Layout, Menu, Row, Col } from 'antd';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import BestCategory from '@components/BestCategory/inedx';
import { defaults } from 'react-chartjs-2';
defaults.global.defaultColor = 'red';
defaults.global.defaultFontColor = 'black';

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
  return (
    <Row gutter={[24, 32]}>
      <Col xs={24} md={12} xl={6} span={6} style={{ height: '200px' }}>
        <Bar data={data} width={100} height={50} options={options} />
      </Col>
      <Col xs={24} md={12} xl={6} span={6}>
        즐겨 찾기 구현!
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
  );
};

export default Home;
