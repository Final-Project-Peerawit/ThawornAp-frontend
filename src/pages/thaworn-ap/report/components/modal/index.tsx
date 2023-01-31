import { Button, message, Modal, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IformInstanceValue } from "../..";

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  form: IformInstanceValue;
};

function modals({ isOpen, onValueChange, form }: IProp): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const router = useRouter();

  const handleOk = (): void => {
    onValueChange(false);
    setIsModalOpen(false);
    message.success("createSuccess");
    router.push("/thaworn-ap/list-report");
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
        <div className="text-center">
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
