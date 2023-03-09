export type IcreateRegisterAdminData = {
  first_name_admin: string;
  last_name_admin: string;
  branch_admin: number;
  password_admin: string;
  email_admin: string;
  phone_admin: string;
};

export type IcreateRegisterAdminDataBody = {
  result: true;
};

type IProp = { data: IcreateRegisterAdminData };

export function createRegisterAdminData({
  data,
}: IProp): Promise<IcreateRegisterAdminDataBody> {
  return Promise.resolve({ result: true });
}
