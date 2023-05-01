import axios from "axios";

export type IListReportData = {
  report_id: string;
  login_id: string;
  branch_id: number;
  branch_name: string;
  room_number: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  type_id: number;
  type_name: string;
  place_id: number;
  place_name: string;
  time_id: string;
  repair_id: number;
  repair_name: string;
  state_id: number;
  description: string | null;
  state_name: string;
  image_file: string | null;
  is_allow: boolean;
  is_new_time: boolean;
  report_dt: string;
  create_dt: string;
  active: number;
  is_time_not_match: boolean;
  description_notify: null | string;
};

export type IQueryListReport = {
  report_id?: string;
  branch_id?: number;
  start_dt?: string;
  end_dt?: string;
  state_id?: number;
  room_number?: number;
};

export type IListReportBody = {
  result: IListReportData[];
};

export async function getListReportData(
  query: IQueryListReport
): Promise<IListReportBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.get(
    `${process.env.REACT_APP_URL}/api/list-report`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      params: {
        reportId: query.report_id,
        branchId: query.branch_id,
        stateId: query.state_id,
        roomNumber: query.room_number,
        startDt: query.start_dt,
        endDt: query.end_dt,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
