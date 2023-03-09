import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, PageHeader, Typography } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import Modals from "./components/modal";
import router, { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getIAdminData } from "src/dataService/api_@personnelManagement_adminData/get";

export type AdminData = {
  user_id: number;
  name_surname: string;
  branch: string;
  phone_contact: string;
  email: string;
  modify_user_data: string;
};

const personnelManagement = (): React.ReactElement => {
  const history = useRouter();
  const [filterData, setFilterData] = useState<AdminData[]>();

  const { data: dataSource, isLoading } = useQuery({
    queryKey: ["report_list"],
    queryFn: async () => getIAdminData(),
  });

  const columns: ColumnsType<AdminData> = [
    {
      align: "center" as const,
      width: "7%",
      title: () => {
        return <Typography.Text strong> รหัสผู้ใช้ </Typography.Text>;
      },
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong>ชื่อ-นามสกุล</Typography.Text>;
      },
      dataIndex: "name_surname",
      key: "name_surname",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong>สาขา</Typography.Text>;
      },
      dataIndex: "branch",
      key: "branch",
      filters: [
        {
          text: "ลาดพร้าว71",
          value: "ลาดพร้าว71",
        },
        {
          text: "ลาดพร้าว78",
          value: "ลาดพร้าว78",
        },
        {
          text: "ลาดกระบัง",
          value: "ลาดกระบัง",
        },
      ],
      onFilter: (value: string, record) => record.branch.indexOf(value) === 0,
    },
    {
      align: "center" as const,
      width: "15%",
      title: () => {
        return <Typography.Text strong>เบอร์ติดต่อ</Typography.Text>;
      },
      dataIndex: "phone_contact",
      key: "phone_contact",
    },
    {
      align: "center" as const,
      title: () => {
        return <Typography.Text strong>email</Typography.Text>;
      },
      dataIndex: "email",
      key: "email",
    },

    {
      width: "8%",
      align: "center" as const,
      title: () => {
        return <Typography.Text strong> แก้ไขข้อมูล </Typography.Text>;
      },
      dataIndex: "user_id",
      key: "modify_user_data",
      render: (user_id: number) => (
        <a onClick={() => history.push(`personnel-management/edit/${user_id}`)}>
          <EditOutlined style={{ color: "#3398E8" }} />
        </a>
      ),
    },
    {
      align: "center" as const,
      width: "5%",
      title: () => {
        return <Typography.Text strong> ลบ </Typography.Text>;
      },
      key: "delete_user_data",
      render: (item: AdminData) => {
        return <Modals item={item} />;
      },
    },
  ];

  useEffect(() => {
    setFilterData(dataSource?.result);
  }, [dataSource?.result]);

  return (
    <div className="flex-initial">
      <div className="flex justify-between">
        <PageHeader title="จัดการเจ้าหน้าที่" />
        <div className="pt-6 pr-8">
          <Button
            type="primary"
            className="flex items-center"
            onClick={() => router.push(`personnel-management/register-admin`)}
          >
            <PlusCircleOutlined />
            เพิ่มเจ้าหน้าที่
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="px-10 pb-10 w-full">
          <Table
            columns={columns}
            dataSource={filterData}
            scroll={{ x: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default personnelManagement;
