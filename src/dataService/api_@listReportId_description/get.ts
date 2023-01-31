export type IListReportDataDescription = {
  id: number;
  branch_name: string;
  room_number: number;
  date_report: string;
  type_report: string;
  step: number;
  place: string;
  fix: string;
  description: string;
  phone_contact: string;
  agreement: string;
  time_fix: string;
};

export type IListReportDataDescriptionBody = {
  result: IListReportDataDescription;
};

const mockData: IListReportDataDescription = {
  id: 3001,
  branch_name: "ลาดกระบัง",
  room_number: 123,
  date_report: "14-sep-2022 07:30:00",
  type_report: "ภายในอาคาร",
  place: "ห้องนอน",
  step: 2,
  fix: "แอร์",
  description: "อยู่ๆแอร์ก็ดับ",
  phone_contact: "0801234567",
  agreement: "อนุญาติให้ช่างเข้ามาซ่อม",
  time_fix: "21-sep-2022 07:30:00",
};

export function getListReportDataDescription(
  id: number
): Promise<IListReportDataDescriptionBody> {
  return Promise.resolve({ result: mockData });
}
