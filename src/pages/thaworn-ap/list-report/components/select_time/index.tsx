import { Button, DatePicker, Form, Modal, Tag, Typography } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import React from "react";

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  onHandleOk: () => void;
};

const selectTime = ({
  isOpen,
  onValueChange,
  onHandleOk,
}: IProp): React.ReactElement => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  return (
    <Modal title={false} open={isOpen} footer={false} closable={false}>
      <div className="text-center pt-5 px-10">
        <Typography.Title level={3}>เลือกนัดวัน-เวลาใหม่</Typography.Title>
      </div>
      <div className="pl-5 pb-5">
        ท่านสามารถเลือกช่วงเวลาด่านล่างหรือกำหนดขึ้นมาใหม่ได้
      </div>
      <Tag color="magenta">magenta</Tag>
      <Tag color="red">red</Tag>
      <Tag color="volcano">volcano</Tag>
      <Tag color="orange">orange</Tag>
      <Form layout="vertical">
        <div className="pt-5">
          <Form.Item
            name="repairsDate"
            label="วันที่-ต้องการให้ช่างเข้ามาซ่อม"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกวันที่ต้องการให้ช่างเข้ามาซ่อม",
              },
            ]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              style={{ width: "100%" }}
              placeholder="เลือกวันที่"
            />
          </Form.Item>
        </div>
      </Form>
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

export default selectTime;
