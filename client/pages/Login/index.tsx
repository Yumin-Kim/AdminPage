import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginAdminActions, signupAdmin_action } from '@actions/admin/admin';
import { LoginAdmin } from '@typings/admin';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = () => {
    dispatch(loginAdminActions.ACTION.REQUEST(form.getFieldValue()));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onClickSignup = useCallback(() => {
    dispatch(
      signupAdmin_action.ACTION.REQUEST({
        name: '123',
        email: 'dna;s0@maver.com',
        M_days: [1, 2],
        password: '123',
        group: 12,
      }),
    );
  }, []);

  const onClickLogin = useCallback(() => {
    console.log();

    // dispatch()
  }, []);

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        <Form name="basic" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" onClick={onClickSignup}>
              test
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
