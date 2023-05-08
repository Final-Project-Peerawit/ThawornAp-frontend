import {
  Button,
  DatePicker,
  Form,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Switch,
  Tag,
  Typography,
  message,
} from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getITimeSlot } from "src/dataService/api_listReport_@timeId_timeSlot/get";
import { IListReportData } from "src/dataService/api_list_report/get";

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  onHandleOk: (value: IformInstanceValueReport) => void;
  listReportData: IListReportData | undefined;
};

export type IformInstanceValueReport = {
  timeSlot: {
    value: string;
    id: number;
  };
  repairsDate: Date | null;
};

const selectTime = ({
  isOpen,
  onValueChange,
  onHandleOk,
  listReportData,
}: IProp): React.ReactElement => {
  const [reportId, setReportId] = useState<string>();
  const [selectReportTime, setSelectReportTime] = useState<{
    id: number;
    value: string;
    repairsDate: Date | null;
  }>();

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const { data: selectTimeSlot, isLoading } = useQuery({
    queryKey: ["select_time_slot", reportId],
    queryFn: async () => getITimeSlot({ report_id: reportId }),
  });

  const selectTimeSlotData = useMemo(() => {
    return selectTimeSlot?.result[0];
  }, [selectTimeSlot]);

  const [form] = Form.useForm<IformInstanceValueReport>();

  const onFinish = (value: IformInstanceValueReport): void => {
    const updatedValue = {
      ...value,
      timeSlot: { id: selectReportTime?.id, value: selectReportTime?.value },
    };
    onValueChange(false);
    onHandleOk(updatedValue);
  };

  const handleSelectTime = (changedValues, allValues): void => {
    switch (allValues.timeSlot) {
      case 1:
        return setSelectReportTime({
          id: 1,
          value: selectTimeSlotData?.time_slot1,
          repairsDate: null,
        });
      case 2:
        return setSelectReportTime({
          id: 2,
          value: selectTimeSlotData?.time_slot2,
          repairsDate: null,
        });
      case 3:
        return setSelectReportTime({
          id: 3,
          value: selectTimeSlotData?.time_slot3,
          repairsDate: null,
        });
      case 4:
        return setSelectReportTime({
          id: 4,
          value: selectTimeSlotData?.time_slot4,
          repairsDate: null,
        });
      case 5:
        return setSelectReportTime({
          id: 5,
          value: null,
          repairsDate: allValues,
        });

      default:
        return null;
    }
  };

  const selectTimeSlot1 = () => {
    const inputDate = new Date(selectTimeSlotData?.time_slot1);
    const inputTimeZone = inputDate.getTimezoneOffset() / 60;
    const outputTimeZone = 0;
    const outputDate = new Date(
      inputDate.getTime() + (outputTimeZone - inputTimeZone) * 60 * 60 * 1000
    );
    return outputDate.toLocaleTimeString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  };

  const selectTimeSlot2 = () => {
    const inputDate = new Date(selectTimeSlotData?.time_slot2);
    const inputTimeZone = inputDate.getTimezoneOffset() / 60;
    const outputTimeZone = 0;
    const outputDate = new Date(
      inputDate.getTime() + (outputTimeZone - inputTimeZone) * 60 * 60 * 1000
    );
    return outputDate.toLocaleTimeString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  };

  const selectTimeSlot3 = () => {
    const inputDate = new Date(selectTimeSlotData?.time_slot3);
    const inputTimeZone = inputDate.getTimezoneOffset() / 60;
    const outputTimeZone = 0;
    const outputDate = new Date(
      inputDate.getTime() + (outputTimeZone - inputTimeZone) * 60 * 60 * 1000
    );
    return outputDate.toLocaleTimeString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  };

  const selectTimeSlot4 = () => {
    const inputDate = new Date(selectTimeSlotData?.time_slot4);
    const inputTimeZone = inputDate.getTimezoneOffset() / 60;
    const outputTimeZone = 0;
    const outputDate = new Date(
      inputDate.getTime() + (outputTimeZone - inputTimeZone) * 60 * 60 * 1000
    );
    return outputDate.toLocaleTimeString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  };

  useEffect(() => {
    setReportId(listReportData?.report_id);
  }, [listReportData]);

  return (
    <Modal title={false} open={isOpen} footer={false} closable={false}>
      <div className="text-center pt-5 px-10">
        <Typography.Title level={3}>เลือกนัดวัน-เวลาใหม่</Typography.Title>
      </div>
      <div className="pl-5 pb-5">
        ท่านสามารถเลือกช่วงเวลาด่านล่างหรือกำหนดขึ้นมาใหม่ได้
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={(changedValues, allValues) => {
          handleSelectTime(changedValues, allValues);
        }}
      >
        <Form.Item
          name="timeSlot"
          label="วันที่-ต้องการให้ช่างเข้ามาซ่อม"
          rules={[
            {
              required: true,
              message: "กรุณาเลือกวันที่-ต้องการให้ช่างเข้ามาซ่อม",
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={1}>
                {new Date(selectTimeSlotData?.time_slot1).toLocaleDateString(
                  "th-TH"
                )}{" "}
                {selectTimeSlot1()}
              </Radio>
              {selectTimeSlotData?.time_slot2 && (
                <Radio value={2}>
                  {new Date(selectTimeSlotData?.time_slot2).toLocaleDateString(
                    "th-TH"
                  )}{" "}
                  {selectTimeSlot2()}
                </Radio>
              )}
              {selectTimeSlotData?.time_slot3 && (
                <Radio value={3}>
                  {new Date(selectTimeSlotData?.time_slot3).toLocaleDateString(
                    "th-TH"
                  )}{" "}
                  {selectTimeSlot3()}
                </Radio>
              )}
              {selectTimeSlotData?.time_slot4 && (
                <Radio value={4}>
                  {new Date(selectTimeSlotData?.time_slot4).toLocaleDateString(
                    "th-TH"
                  )}{" "}
                  {selectTimeSlot4()}
                </Radio>
              )}
              <Radio value={5}>อื่นๆ</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) =>
            prevValues.timeSlot !== curValues.timeSlot
          }
        >
          {({ getFieldValue }) => {
            return (
              getFieldValue("timeSlot") === 5 && (
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
              )
            );
          }}
        </Form.Item>

        <div className="pt-5 flex justify-center space-x-4 px-10">
          <Button danger block onClick={() => onValueChange(false)}>
            ยกเลิก
          </Button>
          <Button type="primary" block htmlType="submit">
            ยืนยัน
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default selectTime;
