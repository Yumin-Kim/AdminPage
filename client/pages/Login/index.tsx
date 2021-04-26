import { Form, Input, Button, Modal, Row, Col, FormInstance, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { loginAdminActions, signupAdmin_action, SignUpActions, retryAdminSignUpAction } from '@actions/admin/admin';
import { LoginAdmin, SignUpAdmin } from '@typings/admin';
import ModalComponent from '@components/ModalComponent/index';
import { ROOTSTATE } from '../../reducers/index';
import Basic from '@layouts/Basic';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const [form]: [FormInstance<LoginAdmin>] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [changeSubmitVaild, setChangeSubmitVaild] = useState(false);
  const [changeModalVaild, setChangeModalVaild] = useState(false);
  const { message: AsyncMessage, adminsInfo } = useSelector((state: ROOTSTATE) => state.admin);
  const dispatch = useDispatch();

  const onFinish = () => {
    setChangeSubmitVaild(true);
    dispatch(loginAdminActions.ACTION.REQUEST(form.getFieldsValue()));
  };

  useEffect(() => {
    if (!visible) setChangeModalVaild(false);
    console.log(adminsInfo.user);

    if (AsyncMessage && !visible && changeModalVaild) {
      message.success(AsyncMessage);
      dispatch(retryAdminSignUpAction());
      setChangeModalVaild(false);
    }
    if (!adminsInfo.user && AsyncMessage.trim() !== '' && changeSubmitVaild) {
      message.warn(AsyncMessage);
      dispatch(retryAdminSignUpAction());
      setChangeSubmitVaild(false);
    }
  }, [visible, adminsInfo, AsyncMessage, changeModalVaild, changeSubmitVaild]);
  const showModal = useCallback(() => {
    setVisible(true);
    setChangeModalVaild(true);
  }, [visible]);

  if (adminsInfo.user) {
    console.log('Redirect');
    <Redirect from="/login" to="/admin/main" />;
  }
  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        <Form name="basic" form={form} onFinish={onFinish}>
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

          <Form.Item {...tailLayout}>
            <Button type="primary" style={{ marginRight: '20px' }} onClick={showModal}>
              회원가입
            </Button>
            <ModalComponent visible={visible} modalFunc={setVisible} />
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
            <Button type="primary">
              <Link to="/admin/main">홈</Link>
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
