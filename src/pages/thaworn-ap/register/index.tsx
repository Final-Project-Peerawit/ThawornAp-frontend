import { Button, Form, Input, message, Modal, PageHeader, Select } from "antd";
import router from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getTypeBranch } from "src/dataService/api_branch/get";
import {
  createRegisterData,
  IcreateRegisterData,
} from "src/dataService/api_register/post";
import Modals from "./components/modals";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export type IformRegisterValue = {
  firstname: string;
  lastname: string;
  branch: number;
  roomNumber: number;
  password: string;
  email: string;
  phoneNumber: string;
};

const register = (): React.ReactElement => {
  const [form] = Form.useForm<IformRegisterValue>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["createRegister"],
    mutationFn: async (data: IcreateRegisterData) => {
      return createRegisterData({ data: data }); // customer id ต้องเอามาจาก local storage
    },
    onSuccess: () => {
      message.success("Create Success");
      router.push("/thaworn-ap/login");
    },
    onError: () => {
      message.error("Create Error");
    },
  });

  const handleOk = (): void => {
    const normal: IcreateRegisterData = {
      first_name: form.getFieldValue("firstname"),
      last_name: form.getFieldValue("lastname"),
      branch: form.getFieldValue("branch"),
      room_number: form.getFieldValue("roomNumber"),
      password: form.getFieldValue("password"),
      email: form.getFieldValue("email"),
      phone: form.getFieldValue("phoneNumber"),
    };
    mutate(normal);
  };

  const confirm = () => {
    Modal.confirm({
      title: "ยืนยันการลงทะเบียนหรือไม่",
      icon: <ExclamationCircleOutlined />,
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk: () => handleOk(),
    });
  };

  const { data: dataBranch, isLoading: isLoadingBranch } = useQuery({
    queryKey: ["register"],
    queryFn: async () => getTypeBranch(),
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 to-gray-400">
      <div className="container max-w-[700px] mx-auto pt-24 ">
        <div className="w-full shadow-lg bg-white rounded-xl">
          <PageHeader onBack={() => window.history.back()} title="ลงทะเบียน" />
          <div className="px-8 pb-8">
            <Form form={form} onFinish={() => confirm()} layout="vertical">
              <Form.Item
                label="ชื่อ"
                name="firstname"
                rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                label="นามสกุล"
                name="lastname"
                rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item name={"branch"} label="สาขา">
                <Select
                  className="w-full"
                  placeholder="เลือกสาขา"
                  allowClear
                  loading={isLoadingBranch}
                  disabled={isLoadingBranch}
                  options={dataBranch?.result.map((item) => ({
                    label: item.branch_name,
                    value: item.branch_id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="เลขห้อง"
                name="roomNumber"
                rules={[{ required: true, message: "กรุณากรอกเลขห้อง" }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                name="password"
                label="รหัสผ่าน"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสผ่าน",
                  },
                ]}
              >
                <Input.Password allowClear />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="ยืนยันรหัสผ่าน"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกยืนยันรหัสผ่าน",
                  },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                    },
                  }),
                ]}
              >
                <Input.Password allowClear />
              </Form.Item>
              <Form.Item
                name="email"
                label="อีเมล์"
                rules={[
                  {
                    type: "email",
                    message: "ข้อมูลที่กรอกไม่ใช่อีเมล์",
                  },
                  {
                    required: true,
                    message: "กรุณากรอกอีเมล์",
                  },
                ]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="เบอร์โทรศัพท์"
                rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
              >
                <Input allowClear />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                ลงทะเบียน
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
