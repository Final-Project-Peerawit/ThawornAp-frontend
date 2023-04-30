import axios from "axios";

export type IDeleteListReport = {
  report_id: string;
};

export type IDeleteListReportBody = {
  result: true;
};

export async function deleteListReport(
  params: IDeleteListReport
): Promise<IDeleteListReportBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.put(
    `${process.env.REACT_APP_URL}/api/list-report`,
    {
      report_id: params.report_id,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
