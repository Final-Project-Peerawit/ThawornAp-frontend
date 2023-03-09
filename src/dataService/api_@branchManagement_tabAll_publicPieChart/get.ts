export type IPublicPieChart = {
  name: string;
  value: number | null;
  type_place_id: number;
};

export type IPublicPieChartBody = {
  result: IPublicPieChart[];
};

const mockData: IPublicPieChart[] = [
  { name: "ลิฟท์", value: 4, type_place_id: 4 },
  { name: "ฟิตเนส", value: 10, type_place_id: 8 },
  { name: "ห้องประชุมรวม/ ห้องกิจกรรม", value: 0, type_place_id: 7 },
  { name: "ที่จอดรถ", value: 25, type_place_id: 6 },
];

export function getPublicPieChart(): Promise<IPublicPieChartBody> {
  return Promise.resolve({ result: mockData });
}
