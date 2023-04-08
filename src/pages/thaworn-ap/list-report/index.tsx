import DatePicker from "@/components/date_picker";
import {
  CheckCircleOutlined,
  FileTextOutlined,
  HourglassOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SmileOutlined,
  SyncOutlined,
  TableOutlined,
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
import Modals from "./components/modal";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getListReportData } from "src/dataService/api_list_report/get";
import { getTypeBranch } from "src/dataService/api_branch/get";
import { getTypeStep } from "src/dataService/api_step/get";
import { useAtom } from "jotai";
import { authentication } from "src/hook/persistanceData";

type IformInstanceValue = {
  branch: number;
  date: Date[];
  roomNumber: number;
  step: number;
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
  const [auth] = useAtom(authentication);

  const { RangePicker } = DatePicker;

  const [form] = Form.useForm<IformInstanceValue>();

  const onFinish = (values: IformInstanceValue): void => {
    // const findDate = filterData.filter((date) => date.createDate >= values.date[0] && date.createDate <= values.date[1])
    // reduce + filterdata
    // const searchBox = filterData
    //   .filter((branch) => branch.branch === values.branch)
    //   .filter((room) => room.room_id === Number(values.roomNumber));
    // const searchBox = filterData.filter(
    //   (room) => room.room_id === Number(values.roomNumber)
    // );
    // console.log(searchBox);
    // const searchBox = filterData.filter((item) => item.status == values.step);
    // setFilterData(searchBox.length === 0 ? dataSource.result : searchBox);
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

  const { data: dataStep, isLoading: isLoadingStep } = useQuery({
    queryKey: ["step_list"],
    queryFn: async () => getTypeStep(),
  });

  const getBranchByLoginId  = () :string => {
    switch(auth.branch_id)
    {
      case 0 :  return 'Admin';
      case 1 :  return 'ลาดพร้าว71';
      case 2 :  return 'ลาดพร้าว78';
      case 3 :  return 'ลาดกระบัง';
    }
    
  }

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
          case 0:
            return (
              <Tag
                icon={<HourglassOutlined style={{ marginBottom: 5 }} />}
                color="default"
              >
                รอรับเรื่อง
              </Tag>
            );
          case 1:
            return (
              <Tag
                icon={<CheckCircleOutlined style={{ marginBottom: 5 }} />}
                color="warning"
              >
                ยืนยันการรับเรื่อง
              </Tag>
            );
          case 2:
            return (
              <Tag
                icon={<TableOutlined style={{ marginBottom: 5 }} />}
                color="warning"
              >
                ยืนยันวัน-เวลา
              </Tag>
            );
          case 3:
            return (
              <Tag
                icon={<SyncOutlined style={{ marginBottom: 5 }} />}
                color="processing"
              >
                กำลังดำเนินการ
              </Tag>
            );
          case 4:
            return (
              <Tag
                icon={<ScheduleOutlined style={{ marginBottom: 5 }} />}
                color="warning"
              >
                ตรวจสอบหลังดำเนินการ
              </Tag>
            );
          case 5:
            return (
              <Tag
                icon={<SmileOutlined style={{ marginBottom: 5 }} />}
                color="success"
              >
                เสร็จสิ้น
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
    form.setFieldsValue({
      branch : auth.branch_id === 0 ? undefined : auth.branch_id
    })
  }, [dataSource?.result]);

  return (
    <div>
      <PageHeader title="รายการแจ้งซ่อม"  subTitle={getBranchByLoginId()}/>
      <div className="px-10 pb-10">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 md:pr-5 md:pt-0">
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
                  disabled={isLoadingBranch ||  auth.branch_id === 0 ? undefined : true}
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/4 md:pr-5 md:pt-0">
              <Form.Item name={"date"} label="ช่วงวันที่">
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/4 md:pr-5 md:pt-0">
              <Form.Item name={"step"} label="สถานะ">
                <Select
                  className="w-full"
                  placeholder="เลือกสถานะ"
                  allowClear
                  options={dataStep?.result.map((item) => ({
                    label: item.step_name,
                    value: item.step_id,
                  }))}
                  loading={isLoadingStep}
                  disabled={isLoadingStep}
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/4 md:flex md:justify-between">
              <div className="md:pr-5">
                <Form.Item name={"roomNumber"} label="เลขห้อง">
                  <Input type="number" placeholder="กรอกเลขห้อง" allowClear />
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
