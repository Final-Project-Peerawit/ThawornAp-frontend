import DatePicker from "@/components/date_picker";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Grid,
  Input,
  PageHeader,
  Select,
  Skeleton,
  Table,
  Tag,
  Typography,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import CardProgressive from "./components/card_progressive";
import Modals from "./components/modal";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getListReportData } from "src/dataService/api_list_report/get";
import { getTypeBranch } from "src/dataService/api_branch/get";

type IformInstanceValue = {
  branch: number;
  date: Date[];
  roomNumber: number;
};

export type IData = {
  key: number;
  id: number;
  createDate: string;
  room_id: number;
  branch: number;
  room: string;
  palce: string;
  fix: string;
  problem: string;
  status: number;
  description: string;
};

const listReport: React.FC = () => {
  const [filterData, setFilterData] = useState<IData[]>();

  const [clickCard, setClickCard] = useState<number>(0);

  const { RangePicker } = DatePicker;

  const [form] = Form.useForm<IformInstanceValue>();

  const onFinish = (values: IformInstanceValue): void => {
    // const findDate = filterData.filter((date) => date.createDate >= values.date[0] && date.createDate <= values.date[1])
    // reduce + filterdata
    // const searchBox = filterData
    //   .filter((branch) => branch.branch === values.branch)
    //   .filter((room) => room.room_id === Number(values.roomNumber));
    // setFilterData(searchBox);
    // const searchBox = filterData.filter(
    //   (room) => room.room_id === Number(values.roomNumber)
    // );
    // const searchBox = filterData.filter(
    //   (branch) => branch.branch === values.branch
    // );
  };

  const history = useRouter();

  const screen = Grid.useBreakpoint();

  const { data: dataSource, isLoading } = useQuery({
    queryKey: ["report_list"],
    queryFn: async () => getListReportData(),
  });

  const { data: dataBranch, isLoading: isLoadingBranch } = useQuery({
    queryKey: ["branch_list"],
    queryFn: async () => getTypeBranch(),
  });

  const normalizeData = (status: number): void => {
    setClickCard(status);
    const result = dataSource.result.filter((data) => data.status === status);
    if (status === 0) {
      setFilterData(dataSource.result);
    } else {
      setFilterData(result);
    }
  };

  const columns: ColumnsType<IData> = [
    {
      align: "center" as const,
      width: "7%",
      title: () => {
        return <Typography.Text strong> รหัสการแจ้ง </Typography.Text>;
      },
      render: (id: number) => {
        return <Typography.Text strong>{id}</Typography.Text>;
      },
      dataIndex: "id",
      key: "id",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> เลขห้อง </Typography.Text>;
      },
      render: (room_id: number) => {
        return <Typography.Text strong>{room_id}</Typography.Text>;
      },
      dataIndex: "room_id",
      key: "room_id",
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
          <>
            {date ? (
              <>
                <div>{date.split(" ")[0]}</div>
                <div>เวลา {date.split(" ")[1]}</div>
              </>
            ) : null}
          </>
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
      width: "8%",
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> รายละเอียด </Typography.Text>;
      },
      dataIndex: "id",
      key: "description",
      render: (id: number) => (
        <a onClick={() => history.push(`list-report/description/${id}`)}>
          <FileTextOutlined style={{ color: "#3398E8" }} />
        </a>
      ),
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> ลบ </Typography.Text>;
      },
      key: "id",
      render: (item: IData) => {
        return <Modals item={item} />;
      },
    },
  ];

  useEffect(() => {
    setFilterData(dataSource?.result);
  }, [dataSource?.result]);

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
                  allowClear
                  options={dataBranch?.result.map((item) => ({
                    label: item.branch_name,
                    value: item.branch_id,
                  }))}
                  loading={isLoadingBranch}
                  disabled={isLoadingBranch}
                />
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
            <div
              className="md:flex md:justify-center md:mx-0 mx-2"
              onClick={() => normalizeData(0)}
            >
              <CardProgressive
                title="รายการทั้งหมด"
                color={clickCard === 0 ? "#5E9DC8" : "#DCF0F7"}
                list_item={dataSource && dataSource.result.length}
                border_item={clickCard === 0 ? "#0C2C52" : "#5E9DC8"}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div
              className="md:flex md:justify-center md:mx-0 mx-2"
              onClick={() => normalizeData(2)}
            >
              <CardProgressive
                title="รอดำเนินการ"
                color={clickCard === 2 ? "#e76580" : "#fff1ef"}
                list_item={
                  dataSource?.result.filter((item) => item.status === 2).length
                }
                border_item={clickCard === 2 ? "#84002E" : "#e76580"}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div
              className="md:flex md:justify-center md:mx-0 mx-2"
              onClick={() => normalizeData(1)}
            >
              <CardProgressive
                title="กำลังดำเนินการ"
                color={clickCard === 1 ? "#FFDE00" : "#ffffe4"}
                list_item={
                  dataSource?.result.filter((item) => item.status === 1).length
                }
                border_item={clickCard === 1 ? "#CC9900" : "#fddfa0"}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div
              className="md:flex md:justify-center md:mx-0 mx-2"
              onClick={() => normalizeData(3)}
            >
              <CardProgressive
                title="สำเร็จ"
                color={clickCard === 3 ? "#99CC00" : "#f3ffd8"}
                list_item={
                  dataSource?.result.filter((item) => item.status === 3).length
                }
                border_item={clickCard === 3 ? "#669966" : "#c7f4a8"}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex-none w-full pt-5">
            <Table
              dataSource={filterData}
              columns={columns}
              pagination={false}
              style={{ width: "100%" }}
              scroll={{ x: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default listReport;
