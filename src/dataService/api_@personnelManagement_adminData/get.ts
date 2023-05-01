import axios from "axios";

export type IAdminData = {
  login_id: string;
  role_id: number;
  branch_id: number;
  branch_name: string;
  firstname: string;
  lastname: string;
  room_number: number;
  email: string;
  phone_number: string;
  password: string;
};

export type IAdminDataBody = {
  result: IAdminData[];
};

export async function getIAdminData(): Promise<IAdminDataBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.get(
    `${process.env.REACT_APP_URL}/api/data_admin`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
