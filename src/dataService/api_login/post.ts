export type IcreateLoginData = {
  email: string;
  password: string;
};

export type IcreateLoginDataBody = {
  result: true;
};

type IProp = {
  customer_id: string;
  data: IcreateLoginData;
};

export function createData({
  customer_id,
  data,
}: IProp): Promise<IcreateLoginDataBody> {
  return Promise.resolve({ result: true });
}
