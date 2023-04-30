import axios from "axios";

export type changeStateBody = {
  state_id?: number;
  is_time_not_match?: number;
  description_notify?: string | null;
};

export type changeStateParams = {
  report_id: string;
};

export type changeStateResBody = {
  result: boolean;
};

export async function updateChangeState(
  params: changeStateParams,
  body: changeStateBody
): Promise<changeStateResBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.put(
    `${process.env.REACT_APP_URL}/api/list-report/${params.report_id}/change-state`,
    {
      state_id: body.state_id,
      is_time_not_match: body.is_time_not_match,
      description_notify: body.description_notify,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
