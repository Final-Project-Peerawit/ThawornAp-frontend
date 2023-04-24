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
import {
  IListReportData,
  IQueryListReport,
  getListReportData,
} from "src/dataService/api_list_report/get";
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

const listReport: React.FC = () => {
  const [filterListReport, setFilterListReport] = useState<IQueryListReport>();
  const [auth] = useAtom(authentication);
  const checkedRoomNumber = auth?.role_id === 2 || auth?.role_id === 3;

  const { RangePicker } = DatePicker;

  const [form] = Form.useForm<IformInstanceValue>();

  const history = useRouter();

  const screen = Grid.useBreakpoint();

  const { data: dataSource, isLoading } = useQuery({
    queryKey: ["report_list", filterListReport],
    queryFn: async () => getListReportData(filterListReport),
  });

  const { data: dataBranch, isLoading: isLoadingBranch } = useQuery({
    queryKey: ["branch_list"],
    queryFn: async () => getTypeBranch(),
  });

  const { data: dataStep, isLoading: isLoadingStep } = useQuery({
    queryKey: ["step_list"],
    queryFn: async () => getTypeStep(),
  });

  const onFinish = (values: IformInstanceValue): void => {
    const normalResult: IQueryListReport = {
      branch_id: values.branch,
      room_number: values.roomNumber,
      state_id: values.step,
      start_dt: values.date ? String(new Date(values.date[0])) : undefined,
      end_dt: values.date ? String(new Date(values.date[1])) : undefined,
    };

    setFilterListReport(normalResult);
  };
  const getBranchByLoginId = (): string => {
    switch (auth?.branch_id) {
      case 0:
        return "สาขาทั้งหมด";
      case 1:
        return "ลาดพร้าว71";
      case 2:
        return "ลาดพร้าว78";
      case 3:
        return "ลาดกระบัง";
    }
  };

  const columns: ColumnsType<IListReportData> = [
    {
      align: "center" as const,
      width: "10%",
      title: () => {
        return <Typography.Text strong> รหัสการแจ้ง </Typography.Text>;
      },
      render: (report_id: number) => {
        return <Typography.Text strong>{report_id}</Typography.Text>;
      },
      dataIndex: "report_id",
      key: "report_id",
    },
    {
      width: "15%",
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> วันที่/เวลา </Typography.Text>;
      },
      dataIndex: "create_dt",
      key: "create_dt",
      render: (date: string) => {
        return (
          <>
            {date ? (
              <>
                <div>
                  {new Date(date.split(" ")[0]).toLocaleDateString("th-TH")}
                </div>

                <div>
                  เวลา{" "}
                  {new Date(date.split(" ")[0]).toLocaleTimeString("th-TH")}
                </div>
              </>
            ) : null}
          </>
        );
      },
    },
    {
      align: "center" as const,
      width: "10%",
      title: () => {
        return <Typography.Text strong> สาขา </Typography.Text>;
      },
      render: (branch_name: string) => {
        return <Typography.Text strong>{branch_name}</Typography.Text>;
      },
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> เลขห้อง </Typography.Text>;
      },
      render: (room_number: number) => {
        return <Typography.Text strong>{room_number}</Typography.Text>;
      },
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> ประเภทการแจ้ง </Typography.Text>;
      },
      dataIndex: "type_name",
      key: "type_name",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> สถานที่ </Typography.Text>;
      },
      dataIndex: "place_name",
      key: "place_name",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> สิ่งที่ต้องการซ่อม </Typography.Text>;
      },
      dataIndex: "repair_name",
      key: "repair_name",
    },
    {
      width: "10%",
      title: () => {
        return <Typography.Text strong> สถานะ </Typography.Text>;
      },
      dataIndex: "state_id",
      key: "state_id",
      align: "center" as const,
      render: (state_id: number) => {
        switch (state_id) {
          case 1:
            return (
              <Tag
                icon={<HourglassOutlined style={{ marginBottom: 5 }} />}
                color="default"
              >
                รอรับเรื่อง
              </Tag>
            );
          case 2:
            return (
              <Tag
                icon={<CheckCircleOutlined style={{ marginBottom: 5 }} />}
                color="warning"
              >
                ยืนยันการรับเรื่อง
              </Tag>
            );
          case 3:
            return (
              <Tag
                icon={<TableOutlined style={{ marginBottom: 5 }} />}
                color="warning"
              >
                ยืนยันวัน-เวลา
              </Tag>
            );
          case 4:
            return (
              <Tag
                icon={<SyncOutlined style={{ marginBottom: 5 }} />}
                color="processing"
              >
                กำลังดำเนินการ
              </Tag>
            );
          case 5:
            return (
              <Tag
                icon={<ScheduleOutlined style={{ marginBottom: 5 }} />}
                color="warning"
              >
                ตรวจสอบหลังดำเนินการ
              </Tag>
            );
          case 6:
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
      dataIndex: "report_id",
      key: "report_id",
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
      key: "report_id",
      render: (item: IListReportData) => {
        return <Modals item={item} />;
      },
    },
  ];

  useEffect(() => {
    form.setFieldsValue({
      branch: auth?.role_id === 3 ? undefined : auth?.branch_id,
      roomNumber: checkedRoomNumber ? undefined : auth?.room_number,
    });
  }, []);

  return (
    <div>
      <PageHeader title="รายการแจ้งซ่อม" subTitle={getBranchByLoginId()} />
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
                  disabled={
                    isLoadingBranch || auth?.role_id === 3 ? undefined : true
                  }
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
                  <Input
                    type="number"
                    placeholder="กรอกเลขห้อง"
                    allowClear
                    disabled={
                      isLoadingBranch || checkedRoomNumber ? undefined : true
                    }
                  />
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
              dataSource={dataSource ? dataSource.result : undefined}
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
