import axios from "axios";

export type updateEditReportParams = {
  report_id: string;
};

export type updateEditReportBody = {
  typeReportId: number;
  placeId: number;
  fixId: number;
  uploadFile: string[] | null;
  description: null | string;
  repairsDate: string;
  allow: boolean;
};

export type updateEditReportResponse = {
  result: boolean;
};

export type IPropUpdateEditReport = {
  params: updateEditReportParams;
  body: updateEditReportBody;
};

export async function updateEditReport(
  data: IPropUpdateEditReport
): Promise<updateEditReportResponse> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.put(
    `${process.env.REACT_APP_URL}/api/report/${data.params.report_id}/edit-report`,
    {
      type_id: data.body.typeReportId,
      place_id: data.body.placeId,
      repair_id: data.body.fixId,
      image_file: data.body.uploadFile,
      description: data.body.description,
      report_dt: data.body.repairsDate,
      is_allow: data.body.allow,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
