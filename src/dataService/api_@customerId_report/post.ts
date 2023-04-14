import axios from "axios";

export type IcreateReportData = {
  typeReportId: number;
  placeId: number;
  fixId: number;
  uploadFile: string[] | null;
  description: null | string;
  repairsDate: string;
  allow: boolean;
};

export type IcreateReportDataBody = {
  result: true;
};

type IProp = {
  data: IcreateReportData;
};

export async function createReport({
  data,
}: IProp): Promise<IcreateReportDataBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );
  await axios.post(
    `${process.env.REACT_APP_URL}/api/report`,
    {
      type_id: data.typeReportId,
      place_id: data.placeId,
      repair_id: data.fixId,
      image_file: data.uploadFile,
      description: data.description,
      report_dt: data.repairsDate,
      is_allow: data.allow,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: true });
}
