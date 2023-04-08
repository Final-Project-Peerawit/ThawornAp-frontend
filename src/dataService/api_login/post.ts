import axios from "axios";

export type IcreateLoginData = {
  email: string;
  password: string;
};

export type IcreateLoginDataBody = {
  result: {
    message: string;
    tokens: string;
    branch_id:number
  };
};

type IProp = {
  data: IcreateLoginData;
};

export async function createData({
  data,
}: IProp): Promise<IcreateLoginDataBody> {
  const result = await axios.post(`${process.env.REACT_APP_URL}/api/login`, {
    email: data.email,
    password: data.password,
  });
  return Promise.resolve({
    result: { message: result.data.message, tokens: result.data.tokens  , branch_id:result.data.branch_id},
  });
}
