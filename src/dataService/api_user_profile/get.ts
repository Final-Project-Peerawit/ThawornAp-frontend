import axios from "axios";

export type IUserProfileResult = {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  room_number: number;
  branch_id: number;
  password: string;
  confirmPassword: string;
};

export type IUserProfileResBody = {
  result: IUserProfileResult[];
};

export async function getUserProfile(): Promise<IUserProfileResBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );
  const result = await axios.get(
    `${process.env.REACT_APP_URL}/api/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
