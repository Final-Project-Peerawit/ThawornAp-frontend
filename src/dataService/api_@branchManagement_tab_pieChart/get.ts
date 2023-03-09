export type INormalPieChart = {
  name: string;
  value: number | null;
  branch_type: number;
};

export type INormalPieChartBody = {
  result: INormalPieChart[];
};

const mockData: INormalPieChart[] = [
  { name: "ลาดพร้าว71", value: 27, branch_type: 1 },
  { name: "ลาดพร้าว78", value: 13, branch_type: 2 },
  { name: "ลาดกระบัง", value: 48, branch_type: 3 },
];

export function getNormalPieChart(): Promise<INormalPieChartBody> {
  return Promise.resolve({ result: mockData });
}
