import { Button, Modal, Typography } from "antd";
import React from "react";

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  onHandleOk: () => void;
};

const modal = ({
  isOpen,
  onValueChange,
  onHandleOk,
}: IProp): React.ReactElement => {
  return (
    <Modal title={false} open={isOpen} footer={false}>
      <div className="text-center pt-5 px-10">
        <Typography.Title level={3}>ยืนยันการเปลี่ยนรหัสผ่านหรือไม่</Typography.Title>
      </div>
      <div className="pt-5 flex justify-center space-x-4 px-10">
        <Button danger block onClick={() => onValueChange(false)}>
          ยกเลิก
        </Button>
        <Button
          type="primary"
          block
          onClick={() => {
            onValueChange(false);
            onHandleOk();
          }}
        >
          ยืนยัน
        </Button>
      </div>
    </Modal>
  );
};

export default modal;
