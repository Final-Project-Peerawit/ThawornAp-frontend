import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Typography } from "antd";
import React, { useState } from "react";
import { IData } from "../..";

interface IProp {
  item: IData;
}

function modals({ item }: IProp): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
    message.success("createSuccess");
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };
  return (
    <>
      <DeleteOutlined onClick={showModal} style={{ color: "#FA6262" }} />
      <Modal
        title={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="text-center">
          <Typography.Title level={1} style={{ color: "#faad14" }}>
            <ExclamationCircleOutlined />
          </Typography.Title>
          <Typography.Title level={3}>
            คุณต้องการที่จะลบรหัสการแจ้ง {item.id} ?
          </Typography.Title>
        </div>

        <div className="pt-5 flex justify-center space-x-4 px-10">
          <Button danger block onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button type="primary" block onClick={handleOk}>
            ยืนยัน
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default modals;
