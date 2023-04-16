import {
  Button,
  Card,
  Modal,
  PageHeader,
  Skeleton,
  Typography,
  message,
} from "antd";
import React from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { getInformation } from "src/dataService/api_information/get";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { upDateInformation } from "src/dataService/api_information/put";

const home = (): React.ReactElement => {
  const route = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getInformation"],
    queryFn: async () => getInformation(),
  });

  const { mutate: delePost } = useMutation({
    mutationKey: ["createInformation"],
    mutationFn: async (id: number) => {
      return upDateInformation({
        params: { id: id },
        query: { isActive: false },
      });
    },
    onSuccess: () => {
      message.success("ลบสำเร็จ");
      refetch();
    },
    onError: () => {
      message.error("สร้างไม่สำเร็จ");
    },
  });

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "ยืนยันการลบโพส",
      icon: <ExclamationCircleOutlined />,
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk: () => delePost(id),
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <PageHeader title="หน้าแรก" />
        <div className="pt-7 pr-10">
          <Button
            type="primary"
            onClick={() => route.push("/thaworn-ap/home/post")}
          >
            + สร้างโพส
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className="flex justify-center mb-10">
          <div className="max-w-[800px] w-full py-8">
            {data.result?.map((item, index) => (
              <div key={index} className="pb-10">
                <Card
                  style={{ borderColor: "#d9d9d9", borderRadius: 5 }}
                  className="shadow-lg"
                >
                  <div className="flex justify-end space-x-3">
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        route.push(`/thaworn-ap/home/edit/${item.id}`)
                      }
                    >
                      แก้ไขโพส
                    </Button>
                    <Button
                      danger
                      size="small"
                      onClick={() => confirmDelete(item.id)}
                    >
                      ลบโพส
                    </Button>
                  </div>
                  <div>
                    <Typography.Title level={5}>{item.title}</Typography.Title>
                  </div>
                  <div>
                    <Typography.Text>{item.description}</Typography.Text>
                  </div>
                  <div className="flex justify-center pt-5">
                    <img
                      src={item.picture}
                      style={{ width: 400, height: 400 }}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default home;
