import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, PageHeader, Upload, message } from "antd";
import { RcFile, UploadFile } from "antd/lib/upload";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  ICreateInformation,
  createInformation,
} from "src/dataService/api_information/post";

export type IFormInstanceValue = {
  title: string;
  description: string;
  picture: UploadFile[];
};

export default function postInfo(): React.ReactElement {
  const [form] = Form.useForm<IFormInstanceValue>();
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["createInformation"],
    mutationFn: async (data: ICreateInformation) => {
      return createInformation({ data: data });
    },
    onSuccess: () => {
      message.success("สร้างสำเร็จ");
      router.push("/thaworn-ap/home");
    },
    onError: () => {
      message.error("สร้างไม่สำเร็จ");
    },
  });

  const onFinish = (): void => {
    const normalUploadFile: string[] = [];

    form
      .getFieldValue("picture")
      ?.map((event) => normalUploadFile.push(event.thumbUrl));

    const normal: ICreateInformation = {
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      picture: normalUploadFile[0] ? normalUploadFile[0] : null,
    };

    mutate(normal);
  };

  const confirm = () => {
    Modal.confirm({
      title: "ยืนยันการสร้างโพส",
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

  const handlePreview = async (file: UploadFile) => {
    file.preview = await getBase64(file.originFileObj as RcFile);

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="w-full">
      <PageHeader title="สร้างโพส" onBack={() => history.back()} />
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <div className="flex flex-initial justify-center mb-10">
        <div className="w-full max-w-[800px]">
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
              <Upload
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={1}
              >
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
    </div>
  );
}
