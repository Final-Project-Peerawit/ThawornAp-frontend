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
  repair_id: number;
  repair_name: string;
  state_id: number;
  description: string | null;
  state_name: string;
  image_file: string | null;
  is_allow: boolean;
  report_dt: string;
  create_dt: string;
  active: number;
};

export type IQueryListReport = {
  report_id?: string | undefined;
  branch_id?: number | undefined;
  start_dt?: string | undefined;
  end_dt?: string | undefined;
  state_id?: number | undefined;
  room_number?: number | undefined;
};

export type IListReportBody = {
  result: IListReportData[];
};

// const mockData: IListReportData[] = [
//   {
//     key: 1,
//     id: 3001,
//     createDate: "15-sep-2022 07:30:00",
//     room_id: 351,
//     branch: 1,
//     room: "ภายในอาคาร",
//     palce: "โถงเดิน",
//     fix: "หลอดไฟ",
//     problem: "ไฟดับ",
//     status: 0,
//     description: "รายละเอียด",
//   },
//   {
//     key: 2,
//     id: 3061,
//     createDate: "17-sep-2022 07:30:00",
//     room_id: 352,
//     branch: 1,
//     room: "ภายในอาคาร",
//     palce: "โถงเดิน",
//     fix: "หลอดไฟ",
//     problem: "ไฟดับ",
//     status: 1,
//     description: "รายละเอียด",
//   },
//   {
//     key: 3,
//     id: 3041,
//     createDate: "14-sep-2022 07:30:00",
//     room_id: 357,
//     branch: 1,
//     room: "ภายในอาคาร",
//     palce: "โถงเดิน",
//     fix: "หลอดไฟ",
//     problem: "ไฟดับ",
//     status: 2,
//     description: "รายละเอียด",
//   },
//   {
//     key: 4,
//     id: 3011,
//     createDate: "1-sep-2022 07:30:00",
//     room_id: 370,
//     branch: 2,
//     room: "ภายในอาคาร",
//     palce: "โถงเดิน",
//     fix: "หลอดไฟ",
//     problem: "ไฟดับ",
//     status: 3,
//     description: "รายละเอียด",
//   },
//   {
//     key: 5,
//     id: 3002,
//     createDate: "14-oct-2022 07:30:00",
//     room_id: 371,
//     branch: 3,
//     room: "ภายในอาคาร",
//     palce: "โถงเดิน",
//     fix: "หลอดไฟ",
//     problem: "ไฟดับ",
//     status: 4,
//     description: "รายละเอียด",
//   },
//   {
//     key: 6,
//     id: 3003,
//     createDate: "10-dec-2022 07:30:00",
//     room_id: 271,
//     branch: 2,
//     room: "ภายในอาคาร",
//     palce: "โถงเดิน",
//     fix: "หลอดไฟ",
//     problem: "ไฟดับ",
//     status: 5,
//     description: "รายละเอียด",
//   },
//   {
//     key: 7,
//     id: 3004,
//     createDate: "27-sep-2022 07:30:00",
//     room_id: 111,
//     branch: 1,
//     room: "ภายในอาคาร",
//     palce: "โถงเดิน",
//     fix: "หลอดไฟ",
//     problem: "ไฟดับ",
//     status: 3,
//     description: "รายละเอียด",
//   },
//   {
//     key: 8,
//     id: 3007,
//     createDate: "14-sep-2022 07:30:00",
//     room_id: 478,
//     branch: 3,
//     room: "ภายในอาคาร",
//     palce: "ห้องน้ำ",
//     fix: "ฝักบัว",
//     problem: "ตะไคร้",
//     status: 3,
//     description: "รายละเอียด",
//   },
//   {
//     key: 10,
//     id: 3006,
//     createDate: "14-sep-2022 07:30:00",
//     room_id: 382,
//     branch: 3,
//     room: "ภายในอาคาร",
//     palce: "ห้องนอน",
//     fix: "แอร์",
//     problem: "ไฟดับ",
//     status: 3,
//     description: "รายละเอียด",
//   },
//   {
//     key: 9,
//     id: 3045,
//     createDate: "14-sep-2022 07:30:00",
//     room_id: 200,
//     branch: 1,
//     room: "ภายนอกอาคาร",
//     palce: "โถงเดิน",
//     fix: "ท่อน้ำ",
//     problem: "น้ำแตก",
//     status: 3,
//     description: "รายละเอียด",
//   },
// ];

export async function getListReportData(
  query: IQueryListReport
): Promise<IListReportBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );
  console.log(query.room_number);
  const result = await axios.get(
    `${process.env.REACT_APP_URL}/api/list-report`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      // params: {
      // reportId: query.report_id,
      // branchId: query.branch_id,
      // stateId: query.state_id,
      // roomNumber: query.room_number,
      // startDt: query.start_dt,
      // endDt: query.end_dt,
      // },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
