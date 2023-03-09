export type IcreateRegisterData = {
  first_name: string;
  last_name: string;
  branch: number;
  room_number: number;
  password: string;
  email: string;
  phone: string;
};

export type IcreateRegisterDataBody = {
  result: true;
};

type IProp = {
  data: IcreateRegisterData;
};

export function createRegisterData({
  data,
}: IProp): Promise<IcreateRegisterDataBody> {
  return Promise.resolve({ result: true });
}
