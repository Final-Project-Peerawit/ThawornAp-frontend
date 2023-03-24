import React, { useEffect, useState } from "react";
import FormAdminRegister, {
  IformRegisterAdminValue,
} from "@/components/form_admin_register";
import { Button, Card, Form, message, PageHeader, Skeleton } from "antd";
import { useRouter } from "next/router";
import Modals from "@/components/confirm_modal";
import {
  getIAdminEditData,
  IAdminEditData,
} from "src/dataService/api_@personnelManagement_edit/get";
import { useMutation, useQuery } from "react-query";
import {
  IeditAdminData,
  updateAdminData,
} from "src/dataService/api_@personnelManagement_edit/put";

const editAdminData = (): React.ReactElement => {
  const router = useRouter();
  const [form] = Form.useForm<IformRegisterAdminValue>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: adminEditData, isLoading: isLoadingAdminEditData } = useQuery({
    queryKey: ["getIAdminEditData", String(router.query.user_id)],
    queryFn: async () => getIAdminEditData(String(router.query.user_id)),
  });

  const { mutate } = useMutation({
    mutationKey: ["editAdminData"],
    mutationFn: async (data: IeditAdminData) => {
      return updateAdminData({ data: data }); // customer id ต้องเอามาจาก local storage
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
    const normal: IeditAdminData = {
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

  useEffect(() => {
    form.setFieldsValue({
      firstnameAdmin: adminEditData?.result.firstname_admin,
      lastnameAdmin: adminEditData?.result.lastname_admin,
      branchAdmin: adminEditData?.result.branch_admin,
      passwordAdmin: adminEditData?.result.password_admin,
      confirmPasswordAdmin: adminEditData?.result.confirm_password_admin,
      emailAdmin: adminEditData?.result.email_admin,
      phoneNumberAdmin: adminEditData?.result.phone_number_admin,
    });
  }, [adminEditData]);

  return (
    <div className="pt-5">
      <PageHeader
        onBack={() => window.history.back()}
        title="แก้ไขข้อมูล"
        subTitle={`รหัสเจ้าหน้าที่ ${router.query.user_id}`}
      />
      {isOpen ? modal() : null}
      {isLoadingAdminEditData ? (
        <Skeleton active />
      ) : (
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
                  onFinish={() => setIsOpen(!isOpen)}
                />
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default editAdminData;
