import DatePicker from "@/components/date_picker";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Grid,
  Input,
  Modal,
  PageHeader,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import CardProgressive from "./components/card_progressive";

type IformInstanceValue = {
  branch: number;
  date: Date[];
  roomNumber: number;
};

const listReport: React.FC = () => {
  const { RangePicker } = DatePicker;

  const [form] = Form.useForm<IformInstanceValue>();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onFinish = (values: IformInstanceValue) => {
    console.log("Success:", values);
  };

  const screen = Grid.useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSource = [
    {
      key: "1",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 1,
      description: "รายละเอียด",
    },
    {
      key: "2",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 2,
      description: "รายละเอียด",
    },
    {
      key: "3",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 3,
      description: "รายละเอียด",
    },
    {
      key: "4",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 3,
      description: "รายละเอียด",
    },
    {
      key: "5",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 1,
      description: "รายละเอียด",
    },
    {
      key: "6",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 2,
      description: "รายละเอียด",
    },
    {
      key: "7",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 3,
      description: "รายละเอียด",
    },
    {
      key: "8",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 3,
      description: "รายละเอียด",
    },
    {
      key: "10",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 3,
      description: "รายละเอียด",
    },
    {
      key: "9",
      id: "3001",
      createDate: "14-sep-2022 07:30:00",
      room: "ภายในอาคาร",
      palce: "โถงเดิน",
      fix: "หลอดไฟ",
      problem: "ไฟดับ",
      status: 3,
      description: "รายละเอียด",
    },
  ];

  const columns = [
    {
      align: "center" as const,
      width: "7%",
      title: () => {
        return <Typography.Text strong> รหัสการแจ้ง </Typography.Text>;
      },
      dataIndex: "id",
      key: "id",
    },
    {
      width: "15%",
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> วันที่/เวลา </Typography.Text>;
      },
      dataIndex: "createDate",
      key: "createDate",
      render: (date: string) => {
        return (
          <div>
            <div>{date.split(" ")[0]}</div>
            <div>เวลา {date.split(" ")[1]}</div>
          </div>
        );
      },
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> ประเภทการแจ้ง </Typography.Text>;
      },
      dataIndex: "room",
      key: "room",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> สถานที่ </Typography.Text>;
      },
      dataIndex: "palce",
      key: "palce",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> สิ่งที่ต้องการซ่อม </Typography.Text>;
      },
      dataIndex: "fix",
      key: "fix",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> ปัญหา </Typography.Text>;
      },
      dataIndex: "problem",
      key: "problem",
    },
    {
      width: "10%",
      title: () => {
        return <Typography.Text strong> สถานะ </Typography.Text>;
      },
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: number) => {
        switch (status) {
          case 1:
            return (
              <Tag
                icon={<ClockCircleOutlined style={{ marginBottom: 5 }} />}
                color="warning"
              >
                กำลังดำเนินการ
              </Tag>
            );
          case 2:
            return (
              <Tag
                icon={<CloseCircleOutlined style={{ marginBottom: 5 }} />}
                color="error"
              >
                รอดำเนินการ
              </Tag>
            );
          case 3:
            return (
              <Tag
                icon={<CheckCircleOutlined style={{ marginBottom: 5 }} />}
                color="success"
              >
                สำเร็จ
              </Tag>
            );
          default:
            return <span>-</span>;
        }
      },
    },
    {
      width: "10%",
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> รายละเอียด </Typography.Text>;
      },
      dataIndex: "description",
      key: "description",
      render: (id: number) => (
        <a>
          <Button
            className="flex items-center rounded-md"
            icon={<FileTextOutlined />}
          >
            รายละเอียด
          </Button>
        </a>
      ),
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> ลบ </Typography.Text>;
      },
      dataIndex: "delete",
      key: "id",
      render: (id: number) => (
        <>
          <a onClick={showModal}>
            <DeleteOutlined />
          </a>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div className="flex-initial">
      <PageHeader title="รายการแจ้งซ่อม" />
      <div className="px-10 pb-10">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 md:pr-5 md:pt-0">
              <Form.Item name={"branch"} label="สาขา">
                <Select
                  className="w-full"
                  placeholder="เลือกสาขา"
                  onChange={onChange}
                  allowClear
                >
                  <Select.Option value={1}>ลาดพร้าว</Select.Option>
                  <Select.Option value={2}>ลาดพร้าว</Select.Option>
                  <Select.Option value={3}>ลาดกระบัง</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-full md:w-1/3 md:pr-5 md:pt-0">
              <Form.Item name={"date"} label="ช่วงวันที่">
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/3 md:flex md:justify-between">
              <div>
                <Form.Item name={"roomNumber"} label="เลขห้อง">
                  <Input type="number" placeholder="กรอกเลขห้อง" />
                </Form.Item>
              </div>
              <div style={{ paddingTop: screen.md ? "1.9rem" : "0" }}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  htmlType="submit"
                  className="flex items-center"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Form>

        <div className="flex flex-wrap pt-10">
          <div className="w-full md:w-1/4">
            <div className="md:flex md:justify-center md:mx-0 mx-2">
              <CardProgressive
                title="รายการทั้งหมด"
                color="#e8f2fa"
                list_item={17}
                border_item="#3B94FF"
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div className="md:flex md:justify-center md:mx-0 mx-2">
              <CardProgressive
                title="รอดำเนินการ"
                color="#fff1ef"
                list_item={12}
                border_item="#e76580"
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div className="md:flex md:justify-center md:mx-0 mx-2">
              <CardProgressive
                title="กำลังดำเนินการ"
                color="#ffffe4"
                list_item={9}
                border_item="#fddfa0"
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div className="md:flex md:justify-center md:mx-0 mx-2">
              <CardProgressive
                title="สำเร็จ"
                color="#f3ffd8"
                list_item={12}
                border_item="#c7f4a8"
              />
            </div>
          </div>
        </div>

        <div className="flex-none w-full mt-2">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ position: ["topRight", "topRight"] }}
            style={{ width: "100%" }}
            scroll={{ x: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default listReport;
