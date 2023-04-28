import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import React from "react";

type IProp = {
  isOpen: boolean; //input
  onValueChange: (value: boolean) => void; //output
  onHandleOk: () => void;
};

export type IformDate = {
  inputDate: Date[] | null;
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

  const onFinish = (values: any) => {
    onValueChange(false);
    onHandleOk();
  };

  return (
    <Modal title={false} open={isOpen} footer={false} closable={false}>
      <div className="text-center pt-5 px-10 space-y-5">
        {/* <Typography.Title level={3}>
          เลือกวัน-เวลาที่นัดผู้เข้าพัก
        </Typography.Title>
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          placeholder="เลือกวันที่"
        />
        <Button>+ วัน-เวลา</Button>

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
        </Button> */}
        <Typography.Title level={3}>
          เลือกวัน-เวลาที่นัดผู้เข้าพัก
        </Typography.Title>
        <Form
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item>
                      <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        disabledDate={disabledDate}
                        style={{ width: "100%" }}
                        placeholder="เลือกวันที่"
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
