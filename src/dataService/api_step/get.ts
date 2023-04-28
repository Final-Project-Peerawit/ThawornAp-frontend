import axios from "axios";

export type ITypeStep = {
  state_id: number;
  state_name: string;
  active: boolean;
  create_dt: string;
};

export type ITypeStepBody = {
  result: ITypeStep[];
};

export async function getTypeStep(): Promise<ITypeStepBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );
  const result = await axios.get(
    `${process.env.REACT_APP_URL}/api/reportState`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );
  return Promise.resolve({ result: result.data.result });
}
