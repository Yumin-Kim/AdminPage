import { Button, Slider, Modal, Form, Input, FormInstance, Space, DatePicker, message } from 'antd';
import React from 'react';
import { memo, useState, useCallback } from 'react';
import { FC } from 'react';
import { SignUpAdmin } from '@typings/admin';
import { useDispatch } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { signupAdmin_action } from '@actions/admin/admin';
import { Moment } from 'moment';
// type aa = SignUpAdmin[keyof SignUpAdmin]; // value
// let valid = {} as Record<keyof SignUpAdmin, boolean>;

interface ModalComponentProp {
  // title: string;
  modalFunc: (param: boolean) => void;
  visible: boolean;
  // onOk: () => void;
  // confirmLoading: boolean;
  // onCancel: () => void;
  // children: React.ReactChild;
  // modalData: React.Dispatch<React.SetStateAction<SignUpAdmin>>;
}
/// input Box SigupAdmin
const ModalComponent: FC<ModalComponentProp> = ({ children, modalFunc, visible }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [title, setTitle] = useState('회원가입 폼입니다!!');
  const [disabled, setDisabled] = useState(false);
  const [form]: [FormInstance<Omit<SignUpAdmin, 'M_days'> & { M_days: [Moment] }>] = Form.useForm();

  const dispatch = useDispatch();

  const handleOk = useCallback(() => {
    let validUserInput = '';
    let AdminSignUpdata = {} as SignUpAdmin;
    (Object.keys(form.getFieldsValue()) as ['name', 'group', 'email', 'password', 'M_days']).map((params) => {
      if (form.getFieldsValue()[params] === undefined || form.getFieldsValue()[params].toString().trim() === '') {
        validUserInput += ` ${params} ,`;
      }
      if (params === 'M_days') {
        form.getFieldsValue()['M_days'].map((value, index) => {
          console.log(value);
          if (!value) validUserInput += ` ${index + 1} day ,`;
        });
      }
    });
    const daysHash = new Set<number>();
    form.getFieldsValue().M_days.map((params, index) => {
      // ((form.getFieldsValue().M_days[index] as unknown) as number) = ;
      daysHash.add(params.day());
    });
    let data = Array.from(daysHash);
    AdminSignUpdata = { ...form.getFieldsValue(), M_days: [...data] };

    if (validUserInput.trim() === '') {
      setConfirmLoading(true);
      if (form.getFieldsValue()) {
        dispatch(signupAdmin_action.ACTION.REQUEST(AdminSignUpdata));
        setTimeout(() => {
          modalFunc(false);
          setConfirmLoading(false);
        }, 1000);
      }
    } else {
      message.warning(`${validUserInput} 입력해주세요`);
      form.resetFields();
    }
  }, [confirmLoading, modalText]);

  const handleCancel = useCallback(() => {
    console.log('Clicked cancel button');
    modalFunc(false);
    form.resetFields();
  }, []);
  return (
    <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
      <Form name="basic" form={form}>
        <Form.Item
          label="이메일을 입력해주세요"
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="이름을 입력해주세요"
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="관리 호" name="group" rules={[{ required: true, message: 'Please input your GroupID!' }]}>
          <Slider defaultValue={30} disabled={disabled} />
        </Form.Item>
        <Form.Item label="출근 날짜를 선택해주세요!!">
          <Form.List name="M_days">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name]} fieldKey={[fieldKey]}>
                      <DatePicker />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    추가하여 출근날짜를 선택해주세요
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ModalComponent);
