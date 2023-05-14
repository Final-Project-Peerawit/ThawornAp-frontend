import { Button, DatePicker, Form, Modal, Typography, message } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { ITimeSlot } from "src/dataService/api_listReport_@timeId_timeSlot/get";
import moment from "moment";
import {
  IPropUpdateSelectTimeSlot,
  updateTimeSlot,
} from "src/dataService/api_listReport_@timeId_timeSlot/put";
import { IListReportBody } from "src/dataService/api_list_report/get";

export type IformConfigDate = {
  timeSlot1: Date | null;
  timeSlot2: Date | null;
  timeSlot3: Date | null;
  timeSlot4: Date | null;
};

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  onHandleOk: () => void;
  getTimeSlot: ITimeSlot | undefined;
  listReportDate: IListReportBody;
};

const configTimeSlot = ({
  isOpen,
  onValueChange,
  onHandleOk,
  getTimeSlot,
  listReportDate,
}: IProp): React.ReactElement => {
  const [form] = Form.useForm<IformConfigDate>();
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const { mutate } = useMutation({
    mutationKey: ["updateTimeSlot"],
    mutationFn: async (data: IPropUpdateSelectTimeSlot) => {
      updateTimeSlot(data);
    },
    onSuccess: () => {
      message.success("แก้ไขสำเร็จ");
      onHandleOk();
    },
    onError: () => {
      message.error("แก้ไขไม่สำเร็จ");
    },
  });

  const onFinish = (values: IformConfigDate) => {
    onValueChange(false);

    const normalResult: IPropUpdateSelectTimeSlot = {
      body: {
        time_slot1: values.timeSlot1
          ? new Date(values.timeSlot1).toJSON()
          : null,
        time_slot2: values.timeSlot2
          ? new Date(values.timeSlot2).toJSON()
          : null,
        time_slot3: values.timeSlot3
          ? new Date(values.timeSlot3).toJSON()
          : null,
        time_slot4: values.timeSlot4
          ? new Date(values.timeSlot4).toJSON()
          : null,
        report_id: listReportDate?.result[0].report_id,
      },
      params: {
        time_id: getTimeSlot.time_id,
      },
    };
    mutate(normalResult);
  };

  useEffect(() => {
    form.setFieldsValue({
      timeSlot1: getTimeSlot?.time_slot1
        ? moment(getTimeSlot?.time_slot1).utcOffset("+1400")
        : undefined,
      timeSlot2: getTimeSlot?.time_slot2
        ? moment(getTimeSlot?.time_slot2).utcOffset("+1400")
        : undefined,
      timeSlot3: getTimeSlot?.time_slot3
        ? moment(getTimeSlot?.time_slot3).utcOffset("+1400")
        : undefined,
      timeSlot4: getTimeSlot?.time_slot4
        ? moment(getTimeSlot?.time_slot4).utcOffset("+1400")
        : undefined,
    });
  }, [getTimeSlot]);

  return (
    <Modal title={false} open={isOpen} footer={false} closable={false}>
      <div className="text-center pt-5 px-10 space-y-5">
        <Typography.Title level={3}>
          แก้ไขวัน-เวลาที่นัดผู้เข้าพัก
        </Typography.Title>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="timeSlot1"
            label="time slot 1"
            rules={[{ required: true, message: "กรุณาเลือกวัน-เวลา" }]}
          >
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

export default configTimeSlot;
