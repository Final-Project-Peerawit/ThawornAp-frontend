export type ITypeBranch = {
  branch_id: number;
  branch_name: string;
  is_active: string;
  create_dt: string;
};

export type ITypeBranchBody = {
  result: ITypeBranch[];
};

const mockData: ITypeBranch[] = [
  {
    branch_id: 1,
    branch_name: "ลาดพร้าว71",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    branch_id: 2,
    branch_name: "ลาดพร้าว78",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    branch_id: 3,
    branch_name: "ลาดกระบัง",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
];

export function getTypeBranch(): Promise<ITypeBranchBody> {
  return Promise.resolve({ result: mockData });
}
