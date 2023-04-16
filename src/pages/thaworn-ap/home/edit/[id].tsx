import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  PageHeader,
  Skeleton,
  Upload,
  message,
} from "antd";
import { RcFile, UploadFile } from "antd/lib/upload";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getInformation } from "src/dataService/api_information/get";
import {
  IUpdateInformationQuery,
  upDateInformation,
} from "src/dataService/api_information/put";

export type IFormInstanceValue = {
  title: string;
  description: string;
  picture: UploadFile[];
};

export default function postInfo(): React.ReactElement {
  const [form] = Form.useForm<IFormInstanceValue>();
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getInformation"],
    queryFn: async () => getInformation(Number(router.query.id)),
  });

  const { mutate } = useMutation({
    mutationKey: ["createInformation"],
    mutationFn: async (data: IUpdateInformationQuery) => {
      return upDateInformation({
        params: { id: Number(router.query.id) },
        query: {
          description: data.description,
          picture: data.picture,
          title: data.title,
        },
      });
    },
    onSuccess: () => {
      message.success("แก้ไขสำเร็จ");
      router.push("/thaworn-ap/home");
    },
    onError: () => {
      message.error("แก้ไขไม่สำเร็จ");
    },
  });

  const onFinish = (): void => {
    const normalUploadFile: string[] = [];

    form
      .getFieldValue("picture")
      ?.map((event) => normalUploadFile.push(event.thumbUrl));

    const normal: IUpdateInformationQuery = {
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      picture: normalUploadFile[0] ? normalUploadFile[0] : null,
    };
    mutate(normal);
  };

  const confirm = () => {
    Modal.confirm({
      title: "ยืนยันการแก้ไขโพส",
      icon: <ExclamationCircleOutlined />,
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk: () => onFinish(),
    });
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  useEffect(() => {
    form.setFieldsValue({
      title: data?.result[0].title,
      description: data?.result[0].description,
      picture: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: data?.result[0].picture,
        },
      ],
    });
  }, [data?.result]);

  return (
    <div className="w-full">
      <PageHeader title="แก้ไขโพส" onBack={() => history.back()} />
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className="flex flex-initial justify-center mb-10">
          <div className="w-full max-w-[800px] p-5">
            <Form layout="vertical" form={form} onFinish={() => confirm()}>
              <Form.Item
                name="title"
                label="หัวข้อ"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="รายละเอียด"
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <Input.TextArea rows={3} style={{ resize: "none" }} />
              </Form.Item>
              <Form.Item
                name="picture"
                label="รูปภาพ"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
              >
                <Upload listType="picture-card" maxCount={1} onPreview={null}>
                  + Upload
                </Upload>
              </Form.Item>
              <div className="text-center mb-5">
                <Button type="primary" htmlType="submit">
                  บันทึก
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
