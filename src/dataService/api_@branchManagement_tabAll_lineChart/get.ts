export type ILineChart = {
  month: Number;
  value: Number | null;
};

export type ILineChartBody = {
  result: ILineChart[];
};

const mockData: ILineChart[] = [
  { month: 1, value: 20 },
  { month: 2, value: 12 },
  { month: 3, value: 48 },
  { month: 4, value: 16 },
  { month: 5, value: 7 },
  { month: 6, value: 27 },
  { month: 7, value: 24 },
  { month: 8, value: 34 },
  { month: 9, value: 67 },
  { month: 10, value: null },
  { month: 11, value: null },
  { month: 12, value: null },
];

export function getLineChart(): Promise<ILineChartBody> {
  return Promise.resolve({ result: mockData });
}
