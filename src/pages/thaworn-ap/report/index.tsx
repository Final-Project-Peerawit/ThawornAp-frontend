import { SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  PageHeader,
  Radio,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import Modals from "./components/modal";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UploadProps } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useQuery } from "react-query";
import { getTypePlace } from "src/dataService/api_@typeReportId_typePlace/get";
import { getTypeFix } from "src/dataService/api_@placeId_typefix/get";
import { RcFile } from "antd/lib/upload";

dayjs.extend(customParseFormat);

export type IformInstanceValue = {
  typeReportId: number;
  placeId: number;
  fixId: number;
  uploadFile: UploadProps[];
  description: null | string;
};

const report: React.FC = () => {
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

  const onFinish = (values: IformInstanceValue): void => {
    console.log(values);
    setIsOpen(!isOpen);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
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
                      return (
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
                      );
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
              <Form.Item name="uploadFile" label="แนบรูปเพิ่มเติม (JPG,PNG)">
                <div className="px-10">
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={onPreview}
                  >
                    + Upload
                  </Upload>
                </div>
              </Form.Item>
              <Form.Item name="description" label="รายละเอียด :">
                <div className="px-10">
                  <Input.TextArea rows={4} />
                </div>
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
