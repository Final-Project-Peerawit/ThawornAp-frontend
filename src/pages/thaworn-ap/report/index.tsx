import { SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  PageHeader,
  Radio,
  Select,
  Upload,
  UploadFile,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import Modals from "./components/modal";
import React, { useEffect, useState } from "react";
import router from "next/router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMutation, useQuery } from "react-query";
import { getTypePlace } from "src/dataService/api_@typeReportId_typePlace/get";
import { getTypeFix } from "src/dataService/api_@placeId_typefix/get";
import { RcFile } from "antd/lib/upload";
import { getIAdminEditData } from "src/dataService/api_@personnelManagement_edit/get";

dayjs.extend(customParseFormat);

export type IformInstanceValue = {
  typeReportId: number;
  placeId: number;
  fixId: number;
  uploadFile: UploadFile[] | null;
  description: null | string;
  repairsDate: Date;
  allow: boolean;
};

const report = (): React.ReactElement => {
  const [form] = Form.useForm<IformInstanceValue>();

  const [typePlaceId, setTypePlaceId] = useState<number>(1);

  const [typeFixId, setTypeFixId] = useState<number>(1);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: typePlaceData, isLoading: isLoadingTypePlaceData } = useQuery({
    queryKey: ["getTypePlace", typePlaceId],
    queryFn: async () => getTypePlace(typePlaceId),
  });

  const { data: typeFixData, isLoading: isLoadingTypeFixData } = useQuery({
    queryKey: ["getTypeObject", typeFixId],
    queryFn: async () => getTypeFix(typeFixId),
  });

  const modal = (): JSX.Element => {
    return (
      <Modals
        isOpen={isOpen}
        onValueChange={(value) => setIsOpen(value)}
        form={form.getFieldsValue()}
      />
    );
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    file.preview = await getBase64(file.originFileObj as RcFile);

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const onFinish = (values: IformInstanceValue): void => {
    setIsOpen(!isOpen);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  useEffect(() => {
    form.setFieldsValue({ typeReportId: 1 });
  }, []);

  return (
    <div className="flex-initial">
      <PageHeader title="แจ้งปัญหา" />
      {isOpen ? modal() : null}
      <div className="flex justify-center">
        <div className="px-10 pb-10 max-w-4xl w-full">
          <Card style={{ borderColor: "#B2B2B2", borderRadius: 5 }}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <div className="flex flex-wrap">
                <div className="w-full">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.typeReportId !== curValues.typeReportId
                    }
                  >
                    {({ getFieldValue, setFieldsValue }) => {
                      return (
                        <Form.Item
                          name="typeReportId"
                          label="ประเภทการแจ้ง"
                          rules={[
                            {
                              required: true,
                              message: "กรุณาเลือกประเภทการแจ้ง",
                            },
                          ]}
                        >
                          <Radio.Group
                            style={{ display: "flex" }}
                            onChange={(e) => {
                              setTypePlaceId(e.target.value);
                              setFieldsValue({
                                placeId: undefined,
                                fixId: undefined,
                              });
                            }}
                          >
                            <Radio.Button
                              value={1}
                              style={{
                                width: "100%",
                                backgroundColor:
                                  getFieldValue("typeReportId") === 1
                                    ? "#3398E8"
                                    : undefined,
                                color:
                                  getFieldValue("typeReportId") === 1
                                    ? "white"
                                    : undefined,
                              }}
                            >
                              ภายในห้องพัก
                            </Radio.Button>
                            <Radio.Button
                              value={2}
                              style={{
                                width: "100%",
                                backgroundColor:
                                  getFieldValue("typeReportId") === 2
                                    ? "#3398E8"
                                    : undefined,
                                color:
                                  getFieldValue("typeReportId") === 2
                                    ? "white"
                                    : undefined,
                              }}
                            >
                              พื้นที่ส่วนกลาง
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </div>
                <div className="w-full">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.additional !== curValues.additional
                    }
                  >
                    {({ setFieldsValue }) => {
                      return (
                        <Form.Item
                          name="placeId"
                          label="สถานที่"
                          rules={[
                            { required: true, message: "กรุณาเลือกสถานที่" },
                          ]}
                        >
                          <Select
                            className="w-full"
                            placeholder="เลือกบริเวณ"
                            allowClear
                            loading={isLoadingTypePlaceData}
                            disabled={isLoadingTypePlaceData}
                            onChange={(value) => {
                              setTypeFixId(value);
                              setFieldsValue({ fixId: undefined });
                            }}
                            options={typePlaceData?.result.map((item) => ({
                              label: item.type_place_name,
                              value: item.type_place_id,
                            }))}
                          />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </div>
                <div className="w-full">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.placeId !== curValues.placeId
                    }
                  >
                    {({ getFieldValue }) => {
                      return getFieldValue("typeReportId") === 1 ? (
                        <Form.Item name="fixId" label="สิ่งที่ต้องการซ่อม">
                          <Select
                            className="w-full"
                            placeholder="เลือกอุปกรณ์"
                            allowClear
                            loading={isLoadingTypeFixData}
                            options={typeFixData?.result.map((item) => ({
                              label: item.type_fix_name,
                              value: item.type_fix_id,
                            }))}
                            disabled={
                              isLoadingTypeFixData || getFieldValue("placeId")
                                ? false
                                : true
                            }
                          />
                        </Form.Item>
                      ) : null;
                    }}
                  </Form.Item>
                </div>
                <div className="w-full">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.typeReportId !== curValues.typeReportId
                    }
                  >
                    {({ getFieldValue }) => {
                      return getFieldValue("typeReportId") === 1 ? (
                        <Form.Item
                          name="repairsDate"
                          label="วันที่-ต้องการให้ช่างเข้ามาซ่อม"
                          rules={[
                            {
                              required: true,
                              message:
                                "กรุณาเลือกวันที่ต้องการให้ช่างเข้ามาซ่อม",
                            },
                          ]}
                        >
                          <DatePicker
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"
                            disabledDate={disabledDate}
                            style={{ width: "100%" }}
                            placeholder="เลือกวันที่"
                          />
                        </Form.Item>
                      ) : null;
                    }}
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name="uploadFile"
                label="แนบรูปเพิ่มเติม (JPG,PNG)"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload listType="picture-card" onPreview={handlePreview}>
                  + Upload
                </Upload>
              </Form.Item>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>

              <Form.Item name="description" label="รายละเอียด :">
                <div className="px-10">
                  <Input.TextArea rows={4} />
                </div>
              </Form.Item>
              <Form.Item name="allow" valuePropName="checked">
                <Checkbox>
                  กรณีที่ผู้เข้าพักไม่อยู่ห้อง
                  อนุญาติให้ช่างพร้อมกับเจ้าหน้าที่ส่วนกลางเข้าดำเนินการแก้ไข
                </Checkbox>
              </Form.Item>
              <div className="text-center">
                <Button type="primary" htmlType="submit">
                  <div className="flex items-center justify-center space-x-2">
                    <SaveOutlined />
                    <span>บันทึก</span>
                  </div>
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default report;
