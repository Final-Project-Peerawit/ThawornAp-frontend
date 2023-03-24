import { Button, message, Modal, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  createReport,
  IcreateReportData,
} from "src/dataService/api_@customerId_report/post";
import { IformInstanceValue } from "../..";

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  form: IformInstanceValue;
};

function modals({ isOpen, onValueChange, form }: IProp): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["createReport"],
    mutationFn: async (data: IcreateReportData) => {
      return createReport({ customer_id: "asdfasdf", data: data }); // customer id ต้องเอามาจาก local storage
    },
    onSuccess: () => {
      message.success("Create Success");
      onValueChange(false);
      setIsModalOpen(false);
      router.push("/thaworn-ap/list-report");
    },
    onError: () => {
      message.error("Create Error");
    },
  });

  const handleOk = (): void => {
    const normalUploadFile: string[] = [];
    form.uploadFile?.map((event) => {
      return normalUploadFile.push(event.thumbUrl);
    });

    const normal: IcreateReportData = {
      type_report_id: form.typeReportId,
      description: form.description,
      fix_id: form.fixId,
      place_id: form.placeId,
      upload_file: normalUploadFile,
    };

    mutate(normal);
  };

  const handleCancel = (): void => {
    onValueChange(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="text-center pt-5 px-10">
          <Typography.Title level={3}>
            คุณต้องการบันทึกรายการแจ้งซ่อมนี้หรือไม่ ?
          </Typography.Title>
        </div>
        <div className="pt-5 flex justify-center space-x-4 px-10">
          <Button danger block onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button type="primary" block onClick={handleOk}>
            บันทึก
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default modals;
