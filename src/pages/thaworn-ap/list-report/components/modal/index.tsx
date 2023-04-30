import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { IListReportData } from "src/dataService/api_list_report/get";
import {
  IDeleteListReport,
  deleteListReport,
} from "src/dataService/api_list_report/put";

interface IProp {
  item: IListReportData;
  refresh: () => void;
}

function modals({ item, refresh }: IProp): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const { mutate } = useMutation({
    mutationKey: ["createRegister"],
    mutationFn: async (data: IDeleteListReport) => {
      return deleteListReport({ report_id: data.report_id });
    },
    onSuccess: () => {
      message.success(`ลบรหัสการแจ้ง ${item?.report_id} สำเร็จ`);
      setIsModalOpen(false);
      refresh();
    },
    onError: () => {
      message.error("ลบไม่สำเร็จ");
    },
  });

  const handleOk = (): void => {
    mutate({ report_id: item?.report_id });
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
          <Typography.Title level={3}>คุณต้องการที่จะลบ</Typography.Title>
          <Typography.Title level={5}>
            รหัสการแจ้ง {item?.report_id} ?
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
