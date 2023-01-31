export type IListReportData = {
  key: number;
  id: number;
  createDate: string;
  room_id: number;
  branch: number;
  room: string;
  palce: string;
  fix: string;
  problem: string;
  status: number;
  description: string;
};

export type IListReportBody = {
  result: IListReportData[];
};

const mockData: IListReportData[] = [
  {
    key: 1,
    id: 3001,
    createDate: "15-sep-2022 07:30:00",
    room_id: 351,
    branch: 1,
    room: "ภายในอาคาร",
    palce: "โถงเดิน",
    fix: "หลอดไฟ",
    problem: "ไฟดับ",
    status: 1,
    description: "รายละเอียด",
  },
  {
    key: 2,
    id: 3061,
    createDate: "17-sep-2022 07:30:00",
    room_id: 352,
    branch: 1,
    room: "ภายในอาคาร",
    palce: "โถงเดิน",
    fix: "หลอดไฟ",
    problem: "ไฟดับ",
    status: 2,
    description: "รายละเอียด",
  },
  {
    key: 3,
    id: 3041,
    createDate: "14-sep-2022 07:30:00",
    room_id: 357,
    branch: 1,
    room: "ภายในอาคาร",
    palce: "โถงเดิน",
    fix: "หลอดไฟ",
    problem: "ไฟดับ",
    status: 3,
    description: "รายละเอียด",
  },
  {
    key: 4,
    id: 3011,
    createDate: "1-sep-2022 07:30:00",
    room_id: 370,
    branch: 2,
    room: "ภายในอาคาร",
    palce: "โถงเดิน",
    fix: "หลอดไฟ",
    problem: "ไฟดับ",
    status: 3,
    description: "รายละเอียด",
  },
  {
    key: 5,
    id: 3002,
    createDate: "14-oct-2022 07:30:00",
    room_id: 371,
    branch: 3,
    room: "ภายในอาคาร",
    palce: "โถงเดิน",
    fix: "หลอดไฟ",
    problem: "ไฟดับ",
    status: 1,
    description: "รายละเอียด",
  },
  {
    key: 6,
    id: 3003,
    createDate: "10-dec-2022 07:30:00",
    room_id: 271,
    branch: 2,
    room: "ภายในอาคาร",
    palce: "โถงเดิน",
    fix: "หลอดไฟ",
    problem: "ไฟดับ",
    status: 2,
    description: "รายละเอียด",
  },
  {
    key: 7,
    id: 3004,
    createDate: "27-sep-2022 07:30:00",
    room_id: 111,
    branch: 1,
    room: "ภายในอาคาร",
    palce: "โถงเดิน",
    fix: "หลอดไฟ",
    problem: "ไฟดับ",
    status: 3,
    description: "รายละเอียด",
  },
  {
    key: 8,
    id: 3007,
    createDate: "14-sep-2022 07:30:00",
    room_id: 478,
    branch: 3,
    room: "ภายในอาคาร",
    palce: "ห้องน้ำ",
    fix: "ฝักบัว",
    problem: "ตะไคร้",
    status: 3,
    description: "รายละเอียด",
  },
  {
    key: 10,
    id: 3006,
    createDate: "14-sep-2022 07:30:00",
    room_id: 382,
    branch: 3,
    room: "ภายในอาคาร",
    palce: "ห้องนอน",
    fix: "แอร์",
    problem: "ไฟดับ",
    status: 3,
    description: "รายละเอียด",
  },
  {
    key: 9,
    id: 3045,
    createDate: "14-sep-2022 07:30:00",
    room_id: 200,
    branch: 1,
    room: "ภายนอกอาคาร",
    palce: "โถงเดิน",
    fix: "ท่อน้ำ",
    problem: "น้ำแตก",
    status: 3,
    description: "รายละเอียด",
  },
];

export function getListReportData(): Promise<IListReportBody> {
  return Promise.resolve({ result: mockData });
}
