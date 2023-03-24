export type IeditAdminData = {
  first_name_admin: string;
  last_name_admin: string;
  branch_admin: number;
  password_admin: string;
  email_admin: string;
  phone_admin: string;
};

export type IeditAdminDataBody = {
  result: true;
};

type IProp = { data: IeditAdminData };

export function updateAdminData({ data }: IProp): Promise<IeditAdminDataBody> {
  return Promise.resolve({ result: true });
}
