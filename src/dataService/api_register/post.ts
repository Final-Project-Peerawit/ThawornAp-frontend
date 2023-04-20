import axios from "axios";

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

export async function createRegisterData({
  data,
}: IProp): Promise<IcreateRegisterDataBody> {
  const result = await axios.post(`${process.env.REACT_APP_URL}/api/register`, {
    firstname: data.first_name,
    lastname: data.last_name,
    branch_id: data.branch,
    room_number: data.room_number,
    password: data.password,
    email: data.email,
    phone_number: data.phone,
  });
  return Promise.resolve({ result: true });
}
