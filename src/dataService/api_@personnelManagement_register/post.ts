import axios from "axios";

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

export async function createRegisterAdminData({
  data,
}: IProp): Promise<IcreateRegisterAdminDataBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );
  const result = await axios.post(
    `${process.env.REACT_APP_URL}/api/registerAdmin`,
    {
      branch_id: data.branch_admin,
      firstname: data.first_name_admin,
      lastname: data.last_name_admin,
      email: data.email_admin,
      phone_number: data.phone_admin,
      password: data.password_admin,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );
  return Promise.resolve({ result: result.data.result });
}
