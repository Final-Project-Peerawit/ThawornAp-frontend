export type IBarChart = {
  name: string;
  brnach_value1: number | null;
  brnach_value2: number | null;
  brnach_value3: number | null;
};

export type IBarChartBody = {
  result: IBarChart[];
};

const mockData: IBarChart[] = [
  {
    name: "January",
    brnach_value1: 83,
    brnach_value2: 73,
    brnach_value3: 55,
  },
  {
    name: "February",
    brnach_value1: 86,
    brnach_value2: 65,
    brnach_value3: 82,
  },
  {
    name: "March",
    brnach_value1: 43,
    brnach_value2: 85,
    brnach_value3: 49,
  },
  {
    name: "April",
    brnach_value1: 72,
    brnach_value2: 53,
    brnach_value3: 39,
  },
  {
    name: "May",
    brnach_value1: 14,
    brnach_value2: 58,
    brnach_value3: 27,
  },
  {
    name: "June",
    brnach_value1: 17,
    brnach_value2: 10,
    brnach_value3: 48,
  },
  {
    name: "July",
    brnach_value1: 43,
    brnach_value2: 14,
    brnach_value3: 28,
  },
  {
    name: "August",
    brnach_value1: 42,
    brnach_value2: 7,
    brnach_value3: 16,
  },
  {
    name: "September",
    brnach_value1: 16,
    brnach_value2: 37,
    brnach_value3: 39,
  },
  {
    name: "October",
    brnach_value1: 80,
    brnach_value2: 97,
    brnach_value3: 42,
  },
  {
    name: "November",
    brnach_value1: 21,
    brnach_value2: 28,
    brnach_value3: 15,
  },
  {
    name: "December",
    brnach_value1: 25,
    brnach_value2: 31,
    brnach_value3: 17,
  },
];

export function getBarChart(): Promise<IBarChartBody> {
  return Promise.resolve({ result: mockData });
}
