import {
  EditOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Form, Modal, Typography, message } from "antd";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { authentication } from "src/hook/persistanceData";
import SelectTimeAdmin, { IformDate } from "../select_time_admin";
import TYPE_ROLE from "@/components/enums/type_roleid";
import { InputNumber } from "antd";
import { IListReportBody } from "src/dataService/api_list_report/get";
import { useMutation, useQuery } from "react-query";
import {
  changeStateBody,
  changeStateParams,
  updateChangeState,
} from "src/dataService/api_listReport_@reportId_changeState/put";
import {
  createTimeSlot,
  createTimeSlotBody,
  createTimeSlotParams,
} from "src/dataService/api_listReport_@reportId_timeSlot/post";
import { getITimeSlot } from "src/dataService/api_listReport_@timeId_timeSlot/get";
import ConfigTimeSlot from "../config_time_slot";
import { deleteTimeSlot } from "src/dataService/api_listReport_@reportId_timeSlot/delete";

interface IProps {
  listReportDate: IListReportBody | undefined;
  reportId: string;
  refetch: () => void;
}

export default function formManageState({
  listReportDate,
  reportId,
  refetch,
}: IProps): React.ReactElement {
  const [edit, setEdit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalConfigOpen, setModalConfigOpen] = useState(false);
  const [ModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [description, setDescription] = useState<string>();
  const [auth] = useAtom(authentication);

  const {
    data: selectTimeSlot,
    isLoading,
    refetch: refetchTimeSlot,
  } = useQuery({
    queryKey: ["config_time_slot", reportId],
    queryFn: async () => getITimeSlot({ report_id: reportId }),
  });

  const { mutate: mutateUpdateChangeState } = useMutation({
    mutationKey: ["updateChangeState"],
    mutationFn: async (data: {
      params: changeStateParams;
      body: changeStateBody;
    }) => {
      return updateChangeState(data.params, data.body);
    },
    onSuccess: () => {
      message.success("อัพเดตสำเร็จ");
      refetch();
    },
    onError: () => {
      message.error("อัพเดตไม่สำเร็จ");
    },
  });

  const { mutate: mutateCreateTimeSlot } = useMutation({
    mutationKey: ["createTimeSlot"],
    mutationFn: async (data: {
      params: createTimeSlotParams;
      body?: createTimeSlotBody;
    }) => {
      return createTimeSlot(data.params, data.body);
    },
    onSuccess: () => {
      message.success("สร้างสำเร็จ");
      mutateUpdateChangeState({
        params: { report_id: reportId },
        body: {
          description_notify: description.trim(),
          is_time_not_match: 1,
        },
      });
      refetch();
      refetchTimeSlot();
    },
    onError: () => {
      message.error("สร้างไม่สำเร็จ");
    },
  });

  const { mutate: mutateDeletTimeSlot } = useMutation({
    mutationKey: ["deleteTimeSlot"],
    mutationFn: async () => {
      return deleteTimeSlot({ report_id: listReportDate?.result[0].report_id });
    },
    onSuccess: () => {
      message.success("ลบสำเร็จ");
      refetch();
    },
    onError: () => {
      message.error("ลบไม่สำเร็จ");
    },
  });

  const selectTimeSlotData = useMemo(() => {
    return selectTimeSlot?.result[0];
  }, [selectTimeSlot]);

  const handleCreateTimeSlot = (data: IformDate): void => {
    setDescription(data.descriptionNotify);
    mutateCreateTimeSlot({
      params: { report_id: reportId },
      body: {
        time_slot1: new Date(data.timeSlot1).toJSON(),
        time_slot2: new Date(data.timeSlot2).toJSON(),
        time_slot3: new Date(data.timeSlot3).toJSON(),
        time_slot4: new Date(data.timeSlot4).toJSON(),
      },
    });
  };

  const confirmReport = (): void => {
    Modal.confirm({
      title: "ยืนยันการรับเรื่อง",
      icon: <ExclamationCircleFilled />,
      okText: "ยันยัน",
      cancelText: "ยกเลิก",
      onOk() {
        mutateUpdateChangeState({
          params: { report_id: reportId },
          body: { state_id: 2 },
        });
      },
    });
  };

  const modalDeleteTimeSlot = () => {
    Modal.confirm({
      title: "ยืนยันการลบโพส",
      icon: <ExclamationCircleOutlined />,
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk: () => mutateDeletTimeSlot(),
    });
  };

  const confirmTime = (): void => {
    Modal.confirm({
      title:
        "ยืนยันวัน - เวลา " +
        new Date(reportData.report_dt).toLocaleString("th-TH"),
      icon: <ExclamationCircleFilled />,
      okText: "ยันยัน",
      cancelText: "ยกเลิก",
      onOk() {
        mutateUpdateChangeState({
          params: { report_id: reportId },
          body: { state_id: 3 },
        });
      },
    });
  };

  const confirmContinue = (): void => {
    Modal.confirm({
      title: "ยืนยันการดำเนินการ",
      icon: <ExclamationCircleFilled />,
      okText: "ยันยัน",
      cancelText: "ยกเลิก",
      onOk() {
        mutateUpdateChangeState({
          params: { report_id: reportId },
          body: { state_id: 4 },
        });
      },
    });
  };

  const confirmSuccess = (): void => {
    Modal.confirm({
      title: "ยืนยันเสร็จสิ้น",
      icon: <ExclamationCircleFilled />,
      okText: "ยันยัน",
      cancelText: "ยกเลิก",
      onOk() {
        mutateUpdateChangeState({
          params: { report_id: reportId },
          body: { state_id: 5 },
        });
      },
    });
  };

  if (auth?.role_id === TYPE_ROLE.USER) {
    return null;
  }

  const reportData = useMemo(() => {
    return listReportDate?.result[0];
  }, [listReportDate]);

  const covertToThaiTimeZone = (value: string): string => {
    const inputDate = new Date(value);
    const inputTimeZone = inputDate.getTimezoneOffset() / 60;
    const outputTimeZone = 0;
    const outputDate = new Date(
      inputDate.getTime() + (outputTimeZone - inputTimeZone) * 60 * 60 * 1000
    );
    return outputDate.toLocaleTimeString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  };

  const displayDateFormat = (label: string, value?: string): string | null => {
    if (!value) return null;

    return `${label}: วันที่ ${new Date(value).toLocaleDateString(
      "th-TH"
    )} เวลา ${covertToThaiTimeZone(value)}`;
  };

  const confirmIimeRepairDate = () => {
    const inputDate = new Date(reportData.report_dt);
    const inputTimeZone = inputDate.getTimezoneOffset() / 60;
    const outputTimeZone = 0;
    const outputDate = new Date(
      inputDate.getTime() + (outputTimeZone - inputTimeZone) * 60 * 60 * 1000
    );
    return outputDate.toLocaleTimeString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  };

  return (
    <div>
      <SelectTimeAdmin
        isOpen={isModalOpen}
        onHandleOk={handleCreateTimeSlot}
        onValueChange={(item) => setIsModalOpen(item)}
      />
      <ConfigTimeSlot
        isOpen={ModalConfigOpen}
        onHandleOk={() => refetchTimeSlot()}
        onValueChange={(item) => setModalConfigOpen(item)}
        getTimeSlot={selectTimeSlotData}
      />
      <div className="px-10">
        <Typography.Title level={4}> ข้อมูลการดำเนินการ </Typography.Title>
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
                    รับเรื่อง
                  </th>
                  <td className="px-6 py-4">
                    <Button
                      type="primary"
                      ghost
                      className="rounded-md"
                      onClick={confirmReport}
                      disabled={reportData.state_id > 1}
                    >
                      ยืนยันคำร้อง
                    </Button>
                  </td>
                </tr>
                {reportData.state_id - 1 >= 1 && (
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      วัน - เวลา
                    </th>
                    <td className="px-6 py-4 ">
                      <Alert
                        className="mb-5"
                        message={`ยันยันเวลา ${new Date(
                          reportData.report_dt
                        ).toLocaleDateString(
                          "th-TH"
                        )} ${confirmIimeRepairDate()}`}
                        banner
                        type="success"
                        action={
                          <Button
                            type="primary"
                            className="rounded-md"
                            disabled={
                              reportData.is_time_not_match ||
                              reportData.state_id > 2
                            }
                            onClick={confirmTime}
                          >
                            ยืนยันการรับเรื่อง
                          </Button>
                        }
                      />
                      <Alert
                        className="mb-5"
                        message={`เวลา [${new Date(
                          reportData.report_dt
                        ).toLocaleDateString(
                          "th-TH"
                        )} ${confirmIimeRepairDate()}] ที่ผู้ใช้เลือก ไม่สามารถนัดช่วงได้ เพื่มวัน-เวลา ให้ผู้ใช้เลือก`}
                        banner
                        type="warning"
                        action={
                          <Button
                            type="primary"
                            className="rounded-md"
                            onClick={() => setIsModalOpen(true)}
                            disabled={
                              reportData.is_time_not_match ||
                              reportData.state_id > 2
                            }
                          >
                            เพิ่มวัน-เวลา
                          </Button>
                        }
                      />
                      {listReportDate.result[0].is_time_not_match ? (
                        <Alert
                          message="วัน-เวลาที่แจ้งผู้ใช้"
                          description={
                            <div>
                              <div>
                                {displayDateFormat(
                                  "ตัวเลือกที่1",
                                  selectTimeSlotData?.time_slot1
                                )}
                              </div>
                              <div>
                                {displayDateFormat(
                                  "ตัวเลือกที่2",
                                  selectTimeSlotData?.time_slot2
                                )}
                              </div>
                              <div>
                                {displayDateFormat(
                                  "ตัวเลือกที่3",
                                  selectTimeSlotData?.time_slot3
                                )}
                              </div>
                              <div>
                                {displayDateFormat(
                                  "ตัวเลือกที่4",
                                  selectTimeSlotData?.time_slot4
                                )}
                              </div>
                            </div>
                          }
                          type="info"
                          action={
                            <div className="flex space-x-3">
                              <Button
                                type="primary"
                                className="rounded-md"
                                onClick={() => setModalConfigOpen(true)}
                              >
                                แก้ไข
                              </Button>
                              <Button
                                danger
                                className="rounded-md"
                                onClick={modalDeleteTimeSlot}
                              >
                                ลบ
                              </Button>
                            </div>
                          }
                        />
                      ) : null}
                    </td>
                  </tr>
                )}
                {reportData.state_id - 1 >= 2 && (
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      ดำเนินการ
                    </th>
                    <td className="px-6 py-4">
                      <Button
                        type="primary"
                        ghost
                        className="rounded-md"
                        onClick={confirmContinue}
                        disabled={reportData.state_id > 3}
                      >
                        ยืนยันดำเนินการ
                      </Button>
                    </td>
                  </tr>
                )}
                {reportData.state_id - 1 >= 3 && (
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      เสร็จสิ้น
                    </th>
                    <td className="px-6 py-4">
                      <Button
                        type="primary"
                        className="rounded-md"
                        onClick={confirmSuccess}
                        disabled={reportData.state_id > 4}
                      >
                        ยืนยันเสร็จสิ้น
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {reportData.state_id === 5 && (
        <>
          <div className="w-full pt-10 px-10">
            <div className="flex justify-between">
              <Typography.Title level={4}> ค่าใช้จ่าย </Typography.Title>

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
          <div className="px-10">
            <Form layout="vertical">
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
                          ค่าอุปกรณ์
                        </th>
                        <td className="px-6 py-4">
                          <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={"บาท"}
                          />
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
                          <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={"บาท"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}
