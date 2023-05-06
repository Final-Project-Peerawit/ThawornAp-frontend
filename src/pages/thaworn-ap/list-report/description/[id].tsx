import {
  CheckCircleOutlined,
  HourglassOutlined,
  ScheduleOutlined,
  SmileOutlined,
  SyncOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Image,
  PageHeader,
  Skeleton,
  Steps,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/router";
import Router from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import SelectTime, { IformInstanceValue } from "../components/select_time";
import { getListReportData } from "src/dataService/api_list_report/get";
import FormManageState from "../components/form_manage_state";
import { useAtom } from "jotai";
import { authentication } from "src/hook/persistanceData";
import TYPE_ROLE from "@/components/enums/type_roleid";
import {
  IProp,
  changeTimeBody,
  updateChangeTime,
} from "src/dataService/api_listReport_@reportId_changetime/put";
import TYPE_STATE from "@/components/enums/type_state";

type IPropSelectTime = {
  selectReportTime: {
    id: number;
    value: string;
  };
};

export default function component({
  selectReportTime,
}: IPropSelectTime): React.ReactElement {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth] = useAtom(authentication);

  const {
    data: listReportData,
    isLoading: isLoadingListReportDate,
    refetch,
  } = useQuery({
    queryKey: ["report_list", router.query.id],
    queryFn: async () =>
      getListReportData({ report_id: router.query.id as string }),
  });

  const { mutate } = useMutation({
    mutationKey: ["updateReporDate"],
    mutationFn: async (data: IProp) => {
      return updateChangeTime({
        body: data.body,
        params: data.params,
        query: data.query,
      });
    },
    onSuccess: () => {
      message.success("อัพเดตสำเร็จ");
      refetch();
    },
    onError: () => {
      message.error("อัพเดตไม่สำเร็จ");
    },
  });

  const handleSelectTime = (value: IPropSelectTime): void => {
    console.log(value);
    if (value.selectReportTime.id === 5) {
      mutate({
        body: {
          report_dt: new Date(value.selectReportTime.value).toJSON(),
          is_new_time: true,
          is_time_not_match: false,
        },
        params: {
          report_id: router.query.id as string,
        },
      });
    } else {
      mutate({
        body: {
          report_dt: new Date(value.selectReportTime.value).toJSON(),
          is_new_time: false,
          is_time_not_match: false,
        },
        params: {
          report_id: router.query.id as string,
        },
        query: {
          state_id: TYPE_STATE.ACCEPT_TIME,
        },
      });
    }
  };

  return (
    <div className="pt-5">
      <PageHeader
        onBack={() => Router.back()}
        title="รายละเอียดการแจ้งซ่อม"
        subTitle={`เลขแจ้งซ่อม ${router.query.id}`}
      />
      <SelectTime
        isOpen={isModalOpen}
        // onHandleOk={handleSelectTime}
        onHandleOk={(value) => console.log(selectReportTime)}
        onValueChange={(item) => setIsModalOpen(item)}
        listReportData={listReportData?.result[0]}
      />
      {isLoadingListReportDate ? (
        <Skeleton active />
      ) : (
        <div className="pb-10">
          <div className="pb-10 px-10">
            <Steps
              current={listReportData?.result[0].state_id - 1}
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
                  title: "เสร็จสิ้น",
                  icon: <SmileOutlined />,
                },
              ]}
            />
          </div>

          {auth?.role_id === TYPE_ROLE.USER &&
          listReportData?.result[0].is_time_not_match ? (
            <div className="px-20 pb-10">
              <Alert
                message="แจ้งเตือน"
                description={listReportData?.result[0].description_notify}
                type="warning"
                showIcon
                action={
                  <Button
                    type="primary"
                    className="rounded-md"
                    onClick={() => setIsModalOpen(true)}
                  >
                    เลือกเวลา
                  </Button>
                }
              />
            </div>
          ) : null}

          {auth?.role_id === TYPE_ROLE.ADMIN ||
          (auth?.role_id === TYPE_ROLE.SUPER_ADMIN &&
            listReportData?.result[0].is_new_time) ? (
            <div className="px-20 pb-10">
              <Alert
                message="แจ้งเตือน"
                description="ผู้เข้าพักได้แจ้งวันและเวลามาใหม่แล้ว"
                type="warning"
                showIcon
              />
            </div>
          ) : null}

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
                        <td className="px-6 py-4">
                          {listReportData?.result[0].report_id}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          สาขา
                        </th>
                        <td className="px-6 py-4">
                          {listReportData?.result[0].branch_name}
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
                          {listReportData?.result[0].room_number}
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
                          <div>
                            {new Date(
                              listReportData?.result[0].create_dt
                            ).toLocaleDateString("th-TH")}{" "}
                            เวลา{" "}
                            {new Date(
                              listReportData?.result[0].create_dt
                            ).toLocaleTimeString("th-TH")}
                          </div>
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
                          {listReportData?.result[0].type_name}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          สถานที่
                        </th>
                        <td className="px-6 py-4">
                          {listReportData?.result[0].place_name}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          สิ่งที่ต้องการซ่อม
                        </th>
                        <td className="px-6 py-4">
                          {listReportData?.result[0].repair_name}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          รายละอียดปัญหา
                        </th>
                        <td className="px-6 py-4">
                          {listReportData?.result[0].description}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          รูปภาพ
                        </th>
                        <td className="px-6 flex justify-center">
                          <Image
                            preview={false}
                            width={300}
                            src={listReportData?.result[0].image_file}
                          />
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
                          {listReportData?.result[0].phone_number}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          เงื่อนไขการเข้าถึง
                        </th>
                        <td className="px-6 py-4">
                          {listReportData?.result[0].is_allow
                            ? "อนุญาติให้ช่างเข้าซ่อมขณะไม่มีคนอยู่"
                            : "ไม่อนุญาติให้ช่างเข้าซ่อมขณะไม่มีคนอยู่"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          เวลาที่ต้องการซ่อม
                        </th>
                        <td className="flex px-6 py-4 items-center space-x-6">
                          <div>
                            {new Date(
                              listReportData?.result[0].report_dt
                            ).toLocaleDateString("th-TH")}{" "}
                            เวลา{" "}
                            {new Date(
                              listReportData?.result[0].report_dt
                            ).toLocaleTimeString("th-TH")}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>

          <FormManageState
            listReportDate={listReportData}
            reportId={String(router.query.id)}
            refetch={() => refetch()}
          />
        </div>
      )}
    </div>
  );
}
