import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  PageHeader,
  Radio,
  Select,
} from "antd";
import { IformInstanceValue } from "../../report";
import { useEffect, useState } from "react";
import { getTypePlace } from "src/dataService/api_@typeReportId_typePlace/get";
import { getTypeFix } from "src/dataService/api_@placeId_typefix/get";
import { useQuery } from "react-query";
import Router, { useRouter } from "next/router";
import Upload, { RcFile, UploadFile } from "antd/lib/upload";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import dayjs from "dayjs";
import { SaveOutlined } from "@ant-design/icons";
import { getListReportData } from "src/dataService/api_list_report/get";
import moment from "moment";
import Modals from "../components/confirm_edit";

const editReport = (): React.ReactElement => {
  const [form] = Form.useForm<IformInstanceValue>();

  const [typeReportId, setTypeReportId] = useState<number>(1);

  const [typePlaceId, setTypePlaceId] = useState<number>(1);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const { data: typePlaceData, isLoading: isLoadingTypePlaceData } = useQuery({
    queryKey: ["getTypePlace", typeReportId],
    queryFn: async () => getTypePlace(typeReportId),
  });

  const { data: typeFixData, isLoading: isLoadingTypeFixData } = useQuery({
    queryKey: ["getTypeObject", typePlaceId],
    queryFn: async () => getTypeFix(typePlaceId),
  });

  const {
    data: listReportData,
    isLoading: isLoadingListReportDate,
    refetch,
  } = useQuery({
    queryKey: ["report_list", router.query.id],
    queryFn: async () =>
      getListReportData({ report_id: router.query.id as string }),
  });

  const modal = (): JSX.Element => {
    return (
      <Modals
        isOpen={isOpen}
        onValueChange={(value) => setIsOpen(value)}
        form={form.getFieldsValue()}
        reportId={listReportData?.result[0].report_id}
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
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.preview as string);
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Image");
  };

  const onFinish = (values: IformInstanceValue): void => {
    setIsOpen(!isOpen);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  useEffect(() => {
    setTypeReportId(listReportData?.result[0].type_id);
    setTypePlaceId(listReportData?.result[0].place_id);
    form.setFieldsValue({
      typeReportId: listReportData?.result[0].type_id,
      placeId: listReportData?.result[0].place_id,
      fixId: listReportData?.result[0].repair_id,
      repairsDate: moment(
        new Date(listReportData?.result[0].report_dt)
      ).utcOffset("+1400"),
      uploadFile: listReportData?.result[0].image_file
        ? [
            {
              uid: "-1",
              name: "image",
              status: "done",
              url: listReportData?.result[0].image_file,
              thumbUrl: listReportData?.result[0].image_file,
            },
          ]
        : [],
      description: listReportData?.result[0].description,
      allow: listReportData?.result[0].is_allow,
    });
  }, [listReportData?.result]);

  return (
    <div className="flex-initial">
      <PageHeader
        title="แก้ไขรายการแจ้งปัญหา"
        onBack={() => Router.back()}
        subTitle={`เลขแจ้งซ่อม ${router.query.id}`}
      />
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
                              setTypeReportId(e.target.value);
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
                              console.log(value);
                              setTypePlaceId(value);
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
                open={false}
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
                <Input.TextArea rows={4} />
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

export default editReport;
