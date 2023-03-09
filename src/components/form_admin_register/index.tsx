import { Form, FormInstance, Input, Select } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { getTypeBranch } from "src/dataService/api_branch/get";

export type IformRegisterAdminValue = {
  firstnameAdmin: string;
  lastnameAdmin: string;
  branchAdmin: number;
  passwordAdmin: string;
  confirmPasswordAdmin: string;
  emailAdmin: string;
  phoneNumberAdmin: string;
};

type IProps = {
  form: FormInstance<IformRegisterAdminValue>;
  button: React.ReactNode;
  onFinish: (values: IformRegisterAdminValue) => void;
};

const formAdminregister = ({
  button,
  form,
  onFinish,
}: IProps): React.ReactElement => {
  const { data: dataBranch, isLoading: isLoadingBranch } = useQuery({
    queryKey: ["register_admin"],
    queryFn: async () => getTypeBranch(),
  });

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="firstnameAdmin"
        label="ชื่อ"
        rules={[{ required: true, message: "กรุณาใส่ชื่อจริง" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastnameAdmin"
        label="นามสกุล"
        rules={[{ required: true, message: "กรุณาใส่นามสกุล" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="branchAdmin"
        label="สาขา"
        rules={[{ required: true, message: "กรุณาเลือกสาขา" }]}
      >
        <Select
          placeholder="กรุณาเลือกสาขา"
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
        name="passwordAdmin"
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
        name="confirmPasswordAdmin"
        label="ยืนยันรหัสผ่าน"
        hasFeedback
        rules={[
          {
            required: true,
            message: "กรุณากรอกยืนยันรหัสผ่าน",
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue("passwordAdmin") === value) {
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
        name="emailAdmin"
        label="อีเมล์"
        rules={[{ required: true, message: "กรุณาใส่อีเมล์" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumberAdmin"
        label="เบอร์โทรศัพท์"
        rules={[{ required: true, message: "กรุณาใส่เบอร์โทรศัพท์" }]}
      >
        <Input />
      </Form.Item>
      <div className="text-center">{button}</div>
    </Form>
  );
};

export default formAdminregister;
