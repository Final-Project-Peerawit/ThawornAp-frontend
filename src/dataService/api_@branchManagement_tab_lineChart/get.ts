export type ILineChart = {
  brnach_value1: number | null;
  brnach_value2: number | null;
  brnach_value3: number | null;
};

export type ILineChartBody = {
  result: ILineChart[];
};

const mockData: ILineChart[] = [
  {
    brnach_value1: 1250,
    brnach_value2: 741,
    brnach_value3: 300,
  },
  {
    brnach_value1: 2100,
    brnach_value2: 550,
    brnach_value3: 890,
  },
  {
    brnach_value1: 489,
    brnach_value2: 0,
    brnach_value3: 4080,
  },
  {
    brnach_value1: 700,
    brnach_value2: 3000,
    brnach_value3: 900,
  },
  {
    brnach_value1: 10000,
    brnach_value2: 200,
    brnach_value3: 840,
  },
];

export function getLineChartHighLow(): Promise<ILineChartBody> {
  return Promise.resolve({ result: mockData });
}
