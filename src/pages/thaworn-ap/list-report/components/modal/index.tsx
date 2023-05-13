import TYPE_ROLE from "@/components/enums/type_roleid";
import TYPE_STATE from "@/components/enums/type_state";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Typography } from "antd";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { IListReportData } from "src/dataService/api_list_report/get";
import {
  IDeleteListReport,
  deleteListReport,
} from "src/dataService/api_list_report/put";
import { authentication } from "src/hook/persistanceData";

interface IProp {
  item: IListReportData;
  refresh: () => void;
}

function modals({ item, refresh }: IProp): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth] = useAtom(authentication);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleDeleteReport = (): boolean => {
    return (
      auth?.role_id === TYPE_ROLE.USER &&
      item.state_id > TYPE_STATE.ACCEPT_REPORT
    );
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
      <DeleteOutlined
        onClick={() => {
          if (!handleDeleteReport()) {
            showModal();
          }
        }}
        style={{
          color: handleDeleteReport() ? "#525252" : "#FA6262",
          cursor: handleDeleteReport() ? "not-allowed" : "pointer",
        }}
      />
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
