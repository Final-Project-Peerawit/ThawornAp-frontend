import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { IcreateLoginData, createData } from "src/dataService/api_login/post";
import { authentication } from "src/hook/persistanceData";

export default function loginPage(): React.ReactElement {
  const [form] = Form.useForm<IcreateLoginData>();
  const [, setAuth] = useAtom(authentication);
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (value: IcreateLoginData) => {
      return createData({ data: value });
    },
    onSuccess: (result) => {
      setAuth({
      token:result.result.tokens,
      branch_id:result.result.branch_id,
      role_id:result.result.role_id,
      room_number:result.result.room_number,

      });
      message.success("เข้าสู่ระบบสำเร็จ");
      router.push("/thaworn-ap/home");
    },
    onError: () => {
      message.error("เกิดข้อผิดพลาด อีเมลล์ หรือ รหัสผ่าน ผิด");
    },
  });

  const onFinish = (values: IcreateLoginData) => {
    const normalResult: IcreateLoginData = {
      email: values.email,
      password: values.password,
    };
    mutate(normalResult);
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
            form={form}
          >
            <Form.Item
              name="email"
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
                  loading={isLoading}
                  disabled={isLoading}
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
