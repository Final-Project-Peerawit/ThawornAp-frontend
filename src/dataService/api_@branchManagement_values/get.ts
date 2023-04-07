export type IValueExpenses = {
  name: string;
  value: number | null;
};

export type IValueExpensesBody = {
  result: IValueExpenses[];
};

const mockData: IValueExpenses[] = [
  { name: "ค่าวัสดุ-อุปกรณ์", value: 12000 },
  { name: "ค่าแรงช่าง", value: 4000 },
  { name: "ยอดรวมรายจ่าย", value: 16000 },
];

export function getValueExpenses(): Promise<IValueExpensesBody> {
  return Promise.resolve({ result: mockData });
}
