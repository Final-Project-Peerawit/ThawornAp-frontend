import React, { useEffect } from "react";
import FormAdminRegister, {
  IformRegisterAdminValue,
} from "@/components/form_admin_register";
import { Button, Card, Form, PageHeader } from "antd";
import { useRouter } from "next/router";

const editAdminData = (): React.ReactElement => {
  const router = useRouter();
  const [form] = Form.useForm<IformRegisterAdminValue>();

  useEffect(() => {
    form.setFieldsValue({
      firstnameAdmin: "string",
      lastnameAdmin: "string",
      branchAdmin: 2,
      passwordAdmin: "uneddefin",
      confirmPasswordAdmin: "uneddefin",
      emailAdmin: "string@gmail.com",
      phoneNumberAdmin: "0888888888",
    });
  }, []);
  return (
    <div className="pt-5">
      <PageHeader
        onBack={() => window.history.back()}
        title="แก้ไขข้อมูล"
        subTitle={`รหัสเจ้าหน้าที่ ${router.query.user_id}`}
      />
      <div className="px-10 pb-10">
        <div className="flex justify-center">
          <div className="px-10 pb-10 max-w-4xl w-full">
            <Card style={{ borderColor: "#B2B2B2", borderRadius: 5 }}>
              <FormAdminRegister
                button={
                  <Button type="primary" htmlType="submit">
                    <div className="flex items-center justify-center space-x-2">
                      <span>บันทึก</span>
                    </div>
                  </Button>
                }
                form={form}
                onFinish={(values) => console.log(values)}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default editAdminData;
