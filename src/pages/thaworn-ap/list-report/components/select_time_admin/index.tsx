import { Button, DatePicker, Form, Input, Modal, Typography } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import React from "react";

export type IformDate = {
  descriptionNotify: string;
  timeSlot1: Date | null;
  timeSlot2: Date | null;
  timeSlot3: Date | null;
  timeSlot4: Date | null;
};

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  onHandleOk: (value: IformDate) => void;
};

const selectTimeAdmin = ({
  isOpen,
  onValueChange,
  onHandleOk,
}: IProp): React.ReactElement => {
  const [form] = Form.useForm<IformDate>();
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const onFinish = (values: IformDate) => {
    onValueChange(false);
    onHandleOk(values);
  };

  return (
    <Modal title={false} open={isOpen} footer={false} closable={false}>
      <div className="text-center pt-5 px-10 space-y-5">
        <Typography.Title level={3}>
          เลือกวัน-เวลาที่นัดผู้เข้าพัก
        </Typography.Title>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="descriptionNotify"
            label="ระบุเหตุผล"
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input.TextArea
              style={{ width: "100%", resize: "none" }}
              placeholder="กรอกเหตุผล"
              rows={3}
            />
          </Form.Item>
          <Form.Item name="timeSlot1" label="time slot 1">
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              onChange={() =>
                form.resetFields(["timeSlot2", "timeSlot3", "timeSlot4"])
              }
              style={{ width: "100%" }}
              placeholder="เลือกวันที่"
            />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.timeSlot1 !== curValues.timeSlot1
            }
          >
            {({ getFieldValue }) => {
              return (
                getFieldValue("timeSlot1") && (
                  <Form.Item name="timeSlot2" label="time slot 2">
                    <DatePicker
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      disabledDate={disabledDate}
                      style={{ width: "100%" }}
                      onChange={() =>
                        form.resetFields(["timeSlot3", "timeSlot4"])
                      }
                      placeholder="เลือกวันที่"
                    />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.timeSlot1 !== curValues.timeSlot1 ||
              prevValues.timeSlot2 !== curValues.timeSlot2
            }
          >
            {({ getFieldValue }) => {
              return (
                getFieldValue("timeSlot1") &&
                getFieldValue("timeSlot2") && (
                  <Form.Item name="timeSlot3" label="time slot 3">
                    <DatePicker
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      disabledDate={disabledDate}
                      onChange={() => form.resetFields(["timeSlot4"])}
                      style={{ width: "100%" }}
                      placeholder="เลือกวันที่"
                    />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.timeSlot1 !== curValues.timeSlot1 ||
              prevValues.timeSlot2 !== curValues.timeSlot2 ||
              prevValues.timeSlot3 !== curValues.timeSlot3
            }
          >
            {({ getFieldValue }) => {
              return (
                getFieldValue("timeSlot1") &&
                getFieldValue("timeSlot2") &&
                getFieldValue("timeSlot3") && (
                  <Form.Item name="timeSlot4" label="time slot 4">
                    <DatePicker
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      disabledDate={disabledDate}
                      style={{ width: "100%" }}
                      placeholder="เลือกวันที่"
                    />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
          <Form.Item>
            <div className="flex space-x-4">
              <Button type="primary" block htmlType="submit">
                ยืนยัน
              </Button>
              <Button danger block onClick={() => onValueChange(false)}>
                ยกเลิก
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default selectTimeAdmin;
