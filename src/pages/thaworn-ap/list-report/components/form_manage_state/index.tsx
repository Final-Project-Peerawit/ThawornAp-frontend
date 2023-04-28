import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
import { useAtom } from "jotai";
import { useState } from "react";
import { authentication } from "src/hook/persistanceData";
import SelectTimeAdmin from "../select_time_admin";

export default function formManageState(): React.ReactElement {
  const [edit, setEdit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [auth] = useAtom(authentication);

  if (auth?.role_id === 1) {
    return null;
  }

  return (
    <div>
      <div className="px-10">
        <div className="flex justify-between">
          <SelectTimeAdmin
            isOpen={isModalOpen}
            onHandleOk={() => console.log()}
            onValueChange={(item) => setIsModalOpen(item)}
          />
          <Typography.Title level={4}> ข้อมูลการดำเนินการ </Typography.Title>
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
                    <td className="px-6 py-4 space-x-5">
                      <Button
                        type="primary"
                        ghost
                        className="rounded-md"
                        disabled={!edit}
                      >
                        ยืนยันวัน - เวลา
                      </Button>
                      <Button
                        type="primary"
                        ghost
                        className="rounded-md"
                        disabled={!edit}
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
  );
}
