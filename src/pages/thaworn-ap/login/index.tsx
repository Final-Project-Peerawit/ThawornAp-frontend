import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

export default function loginPage(): React.ReactElement {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="relative w-full h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="max-w-[400px] w-full mx-auto px-8 border-4 shadow-sm rounded-lg">
          <h2 className="text-4xl font-bold text-center py-6">ThawornAp</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                allowClear
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center w-full py-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button w-full"
                >
                  Log in
                </Button>
              </div>
              Or <a href="/thaworn-ap/register">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
