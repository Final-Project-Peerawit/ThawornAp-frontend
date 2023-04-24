import axios from "axios";

export type IMenuList = {
  role_list_id: number;
  role_id: number;
  function_id: number;
  role_name: string;
  function_name_th: string;
  function_name_en: string;
};

export type IMenuListBody = {
  result: IMenuList[];
};

export async function getMenuList(): Promise<IMenuListBody> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );
  const result = await axios.get(`${process.env.REACT_APP_URL}/api/menu`, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  return Promise.resolve({ result: result.data.result });
}
