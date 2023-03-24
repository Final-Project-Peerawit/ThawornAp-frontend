export type IAdminEditData = {
  firstname_admin: string;
  lastname_admin: string;
  branch_admin: number;
  password_admin: string;
  confirm_password_admin: string;
  email_admin: string;
  phone_number_admin: string;
};

export type IAdminEditDataBody = {
  result: IAdminEditData;
};

const mockData: IAdminEditData = {
  firstname_admin: "string",
  lastname_admin: "string",
  branch_admin: 2,
  password_admin: "a4s56df48sd",
  confirm_password_admin: "a4s56df48sd",
  email_admin: "string@gmail.com",
  phone_number_admin: "0888888888",
};
export function getIAdminEditData(userId: string): Promise<IAdminEditDataBody> {
  return Promise.resolve({ result: mockData });
}
