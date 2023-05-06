import axios from "axios";

export type changeTimeBody = {
  report_dt: string;
  is_time_not_match: boolean;
  is_new_time: boolean;
};

export type changeTimeParams = {
  report_id: string;
};

export type changeTimeQuery = {
  state_id?: number;
};

export type changeTimeResBody = {
  result: boolean;
};

export type IProp = {
  params: changeTimeParams;
  body: changeTimeBody;
  query?: changeTimeQuery;
};

export async function updateChangeTime(
  data: IProp
): Promise<changeTimeResBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.put(
    `${process.env.REACT_APP_URL}/api/list-report/${data.params.report_id}/change-time`,
    {
      report_dt: data.body.report_dt,
      is_time_not_match: data.body.is_time_not_match,
      is_new_time: data.body.is_new_time,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      params: {
        state_id: data.query.state_id,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
