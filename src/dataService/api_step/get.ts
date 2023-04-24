export type ITypeStep = {
  step_id: number;
  step_name: string;
  is_active: boolean;
  create_dt: string;
};

export type ITypeStepBody = {
  result: ITypeStep[];
};

const mockData: ITypeStep[] = [
  {
    step_id: 1,
    step_name: "รอรับเรื่อง",
    is_active: true,
    create_dt: "2022-01-01 11:00",
  },
  {
    step_id: 2,
    step_name: "ยืนยันการรับเรื่อง",
    is_active: true,
    create_dt: "2022-01-01 11:00",
  },
  {
    step_id: 3,
    step_name: "ยืนยันวัน-เวลา",
    is_active: true,
    create_dt: "2022-01-01 11:00",
  },
  {
    step_id: 4,
    step_name: "กำลังดำเนินการ",
    is_active: true,
    create_dt: "2022-01-01 11:00",
  },
  {
    step_id: 5,
    step_name: "ตรวจสอบหลังดำเนินการ",
    is_active: true,
    create_dt: "2022-01-01 11:00",
  },
  {
    step_id: 6,
    step_name: "เสร็จสิ้น",
    is_active: true,
    create_dt: "2022-01-01 11:00",
  },
];

export function getTypeStep(): Promise<ITypeStepBody> {
  return Promise.resolve({ result: mockData });
}
