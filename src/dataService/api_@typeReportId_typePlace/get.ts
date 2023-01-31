export type ItypePlace = {
  type_report_id: number;
  type_place_id: number;
  type_place_name: string;
  is_active: string;
  create_dt: string;
};

export type ITypePlaceBody = {
  result: ItypePlace[];
};

const mockData: ItypePlace[] = [
  {
    type_report_id: 1,
    type_place_id: 1,
    type_place_name: "ห้องนอน",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_report_id: 1,
    type_place_id: 2,
    type_place_name: "ห้องน้ำ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_report_id: 1,
    type_place_id: 3,
    type_place_name: "ระเบียง",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_report_id: 2,
    type_place_id: 4,
    type_place_name: "ลิฟต์",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_report_id: 2,
    type_place_id: 5,
    type_place_name: "ชั้นทั้งหมดของอาคาร",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_report_id: 2,
    type_place_id: 6,
    type_place_name: "ที่จอดรถ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_report_id: 2,
    type_place_id: 7,
    type_place_name: "ห้องประชุมรวม / ห้องกิจกรรม",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_report_id: 2,
    type_place_id: 8,
    type_place_name: "ฟิตเนส",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
];

export function getTypePlace(typeReportId: number): Promise<ITypePlaceBody> {
  const normalResult = mockData.filter(
    (item) => item.type_report_id === typeReportId
  );

  return Promise.resolve({ result: normalResult });
}
