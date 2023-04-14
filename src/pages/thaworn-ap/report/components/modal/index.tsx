import { Button, message, Modal, Typography, UploadFile } from "antd";
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
      return createReport({ data: data });
    },
    onSuccess: () => {
      message.success("Create Success");
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
      typeReportId: form.typeReportId,
      placeId: form.placeId,
      fixId: form.fixId,
      uploadFile: normalUploadFile[0] ? normalUploadFile : null,
      description: form.description ? form.description : null,
      repairsDate: new Date(String(form.repairsDate)).toJSON(),
      allow: form.allow ? true : false,
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
