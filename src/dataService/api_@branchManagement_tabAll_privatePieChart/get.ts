export type IPrivatePieChart = {
  name: string;
  value: number | null;
  type_place_id: number;
};

export type IPrivatePieChartBody = {
  result: IPrivatePieChart[];
};

const mockData: IPrivatePieChart[] = [
  { name: "ห้องน้ำ", value: 15, type_place_id: 2 },
  { name: "ห้องนอน", value: 27, type_place_id: 1 },
  { name: "ระเบียง", value: 4, type_place_id: 3 },
];

export function getPrivatePieChart(): Promise<IPrivatePieChartBody> {
  return Promise.resolve({ result: mockData });
}
