import { Button, Card, Form, message, PageHeader } from "antd";
import router from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createRegisterAdminData,
  IcreateRegisterAdminData,
} from "src/dataService/api_@personnelManagement_register/post";
import { getTypeBranch } from "src/dataService/api_branch/get";
import Modals from "@/components/confirm_modal";
import FormAdminRegister from "@/components/form_admin_register";

export type IformRegisterAdminValue = {
  firstnameAdmin: string;
  lastnameAdmin: string;
  branchAdmin: number;
  passwordAdmin: string;
  confirmPasswordAdmin: string;
  emailAdmin: string;
  phoneNumberAdmin: string;
};

const registerAdmin = (): React.ReactElement => {
  const [form] = Form.useForm<IformRegisterAdminValue>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["createRegisterAdmin"],
    mutationFn: async (data: IcreateRegisterAdminData) => {
      return createRegisterAdminData({ data: data }); // customer id ต้องเอามาจาก local storage
    },
    onSuccess: () => {
      message.success("Create Success");
      router.push("/thaworn-ap/personnel-management");
    },
    onError: () => {
      message.error("Create Error");
    },
  });

  const handleOk = (): void => {
    const normal: IcreateRegisterAdminData = {
      first_name_admin: form.getFieldValue("firstnameAdmin"),
      last_name_admin: form.getFieldValue("lastnameAdmin"),
      branch_admin: form.getFieldValue("branchAdmin"),
      password_admin: form.getFieldValue("passwordAdmin"),
      email_admin: form.getFieldValue("emailAdmin"),
      phone_admin: form.getFieldValue("phoneNumberAdmin"),
    };
    mutate(normal);
  };

  const modal = (): JSX.Element => {
    return (
      <Modals
        isOpen={isOpen}
        onValueChange={(value) => setIsOpen(value)}
        onHandleOk={handleOk}
      />
    );
  };

  const { data: dataBranch, isLoading: isLoadingBranch } = useQuery({
    queryKey: ["register_admin"],
    queryFn: async () => getTypeBranch(),
  });

  return (
    <div className="pt-5">
      <PageHeader
        onBack={() => window.history.back()}
        title="ลงทะเบียนเจ้าหน้าที่"
      />

      <div className="px-10 pb-10">
        <div className="flex justify-center">
          <div className="px-10 pb-10 max-w-4xl w-full">
            <Card style={{ borderColor: "#B2B2B2", borderRadius: 5 }}>
              {isOpen ? modal() : null}
              <FormAdminRegister
                onFinish={() => setIsOpen(!isOpen)}
                button={
                  <Button type="primary" htmlType="submit">
                    <div className="flex items-center justify-center space-x-2">
                      <span>ลงทะเบียน</span>
                    </div>
                  </Button>
                }
                form={form}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default registerAdmin;
