import Basic from '@layouts/Basic';
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.css"
render(
  <BrowserRouter>
    <Basic />
  </BrowserRouter>,
  document.getElementById('app'),
);