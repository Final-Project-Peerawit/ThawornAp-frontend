import { Button, message, Modal, Typography, UploadFile } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { IcreateReportData } from "src/dataService/api_@customerId_report/post";
import { IformInstanceValue } from "../../../report";
import {
  IPropUpdateEditReport,
  updateEditReport,
  updateEditReportBody,
  updateEditReportParams,
} from "src/dataService/api_@customerId_report/put";

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  reportId: string;
  form: IformInstanceValue;
};

function confirmEdit({
  isOpen,
  onValueChange,
  reportId,
  form,
}: IProp): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const router = useRouter();

  const { mutate: MutateUpdateEditReport } = useMutation({
    mutationKey: ["updateEditReport"],
    mutationFn: async (data: IPropUpdateEditReport) => {
      return updateEditReport(data);
    },
    onSuccess: () => {
      message.success("แก้ไขสำเร็จ");
      router.push("/thaworn-ap/list-report");
    },
    onError: () => {
      message.error("แก้ไขไม่สำเร็จ");
    },
  });

  const handleOk = (): void => {
    const normalUploadFile: string[] = [];
    form.uploadFile?.map((event) => {
      return normalUploadFile.push(event.thumbUrl);
    });

    if (form.typeReportId === 2) {
      form.fixId = 0;
    }

    const normal: IPropUpdateEditReport = {
      params: { report_id: reportId },
      body: {
        typeReportId: form.typeReportId,
        placeId: form.placeId,
        fixId: form.fixId,
        uploadFile: normalUploadFile[0] ? normalUploadFile : null,
        description: form.description ? form.description : null,
        repairsDate: new Date(String(form.repairsDate)).toJSON(),
        allow: form.allow ? true : false,
      },
    };

    MutateUpdateEditReport(normal);
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

export default confirmEdit;
