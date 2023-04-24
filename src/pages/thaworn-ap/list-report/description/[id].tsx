import {
  CheckCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HourglassOutlined,
  SaveOutlined,
  ScheduleOutlined,
  SmileOutlined,
  SyncOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  PageHeader,
  Skeleton,
  Steps,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import Router from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getListReportDataDescription } from "src/dataService/api_@listReportId_description/get";
import SelectTime from "../components/select_time";

type ITypeMockData = {
  branch_name: string;
  room_number: number;
  date_report: string;
  type_report: string;
  place: string;
  fix: string;
  description: string;
  phone_contact: string;
  agreement: string;
  time_fix: string;
};

export default function component(): React.ReactElement {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["datamock"],
    queryFn: async () => getListReportDataDescription(Number(router.query.id)),
  });

  return (
    <div className="pt-5">
      <PageHeader
        onBack={() => Router.back()}
        title="รายละเอียดการแจ้งซ่อม"
        subTitle={`เลขแจ้งซ่อม ${router.query.id}`}
      />
      <SelectTime
        isOpen={isModalOpen}
        onHandleOk={() => console.log()}
        onValueChange={(item) => setIsModalOpen(item)}
      />
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className="pb-10">
          <div className="pb-10 px-10">
            <Steps
              current={data?.result.step}
              items={[
                {
                  title: "รอรับเรื่อง",
                  icon: <HourglassOutlined />,
                },
                {
                  title: "ยืนยันการรับเรื่อง",
                  icon: <CheckCircleOutlined />,
                },
                {
                  title: "ยืนยันวัน-เวลา",
                  icon: <TableOutlined />,
                },
                {
                  title: "กำลังดำเนินการ",
                  icon: <SyncOutlined />,
                },
                {
                  title: "ตรวจสอบหลังดำเนินการ",
                  icon: <ScheduleOutlined />,
                },
                {
                  title: "เสร็จสิ้น",
                  icon: <SmileOutlined />,
                },
              ]}
            />
          </div>
          <div className="px-10">
            <Typography.Title level={4}> ข้อมูลการแจ้งปัญหา </Typography.Title>
          </div>
          <div className="px-10">
            <div className="pb-10">
              <Card
                style={{
                  borderColor: "#B2B2B2",
                  borderRadius: 5,
                }}
                bodyStyle={{ padding: 0 }}
              >
                <div className="relative overflow-x-auto sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          รหัสการแจ้ง
                        </th>
                        <td className="px-6 py-4">{data?.result.id}</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          สาขา
                        </th>
                        <td className="px-6 py-4">
                          {data?.result.branch_name}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          เลขห้อง
                        </th>
                        <td className="px-6 py-4">
                          {data?.result.room_number}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          วันที่และเวลาแจ้ง
                        </th>
                        <td className="px-6 py-4">
                          {data?.result.date_report}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          ประเภทการแจ้ง
                        </th>
                        <td className="px-6 py-4">
                          {data?.result.type_report}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          สถานที่
                        </th>
                        <td className="px-6 py-4">{data?.result.place}</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          สิ่งที่ต้องการซ่อม
                        </th>
                        <td className="px-6 py-4">{data?.result.fix}</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          รายละอียดปัญหา
                        </th>
                        <td className="px-6 py-4">
                          {data?.result.description}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          รูปภาพ
                        </th>
                        <td className="px-6 py-4">
                          {data?.result.description}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          เบอร์ติดต่อ
                        </th>
                        <td className="px-6 py-4">
                          {data?.result.phone_contact}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          เงื่อนไขการเข้าถึง
                        </th>
                        <td className="px-6 py-4">{data?.result.agreement}</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          เวลาที่ต้องการซ่อม
                        </th>
                        <td className="flex px-6 py-4 items-center space-x-6">
                          <div>{data?.result.time_fix}</div>
                          <Button
                            type="primary"
                            ghost
                            className="rounded-md"
                            onClick={() => setIsModalOpen(true)}
                          >
                            เลือกเวลา
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          ยืนยันผลการดำเนินการ
                        </th>
                        <td className="px-6 py-4 space-x-4">
                          <Button type="primary" ghost className="rounded-md">
                            ยืนยันผลการดำเนินการ
                          </Button>
                          <Button
                            type="primary"
                            danger
                            ghost
                            className="rounded-md"
                          >
                            แก้ไขผลการดำเนินการ
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
          <div className="px-10">
            <div className="flex justify-between">
              <Typography.Title level={4}>
                {" "}
                ข้อมูลการดำเนินการ{" "}
              </Typography.Title>
              {!edit ? (
                <Button
                  type="primary"
                  ghost
                  icon={<EditOutlined />}
                  onClick={() => setEdit(!edit)}
                >
                  แก้ไขข้อมูล
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => setEdit(!edit)}
                >
                  บันทึก
                </Button>
              )}
            </div>
          </div>
          <Form>
            <div className="px-10">
              <Card
                style={{
                  borderColor: "#B2B2B2",
                  borderRadius: 5,
                }}
                bodyStyle={{ padding: 0 }}
              >
                <div className="relative overflow-x-auto sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          ยืนยันการรับเรื่อง
                        </th>
                        <td className="px-6 py-4">
                          <Button
                            type="primary"
                            ghost
                            className="rounded-md"
                            disabled={!edit}
                          >
                            ยืนยันคำร้อง
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          ยืนยันวัน - เวลา
                        </th>
                        <td className="px-6 py-4">
                          <Button
                            type="primary"
                            ghost
                            className="rounded-md"
                            disabled={!edit}
                          >
                            ยืนยันวัน - เวลา
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          ยืนยันผลการซ่อม
                        </th>
                        <td className="px-6 py-4">
                          <Button
                            type="primary"
                            ghost
                            className="rounded-md"
                            disabled={!edit}
                          >
                            ยืนยันผลการดำเนินการ
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          ค่าอุปกรณ์
                        </th>
                        <td className="px-6 py-4">
                          <Input type="text" disabled={!edit} />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          ค่าแรงช่าง
                        </th>
                        <td className="px-6 py-4">
                          <Input type="text" disabled={!edit} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
