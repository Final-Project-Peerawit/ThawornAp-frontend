import axios from "axios";


export type ITypeBranch = {
  branch_id: number;
  branch_name: string;
  active: string;
  create_dt: string;
};

export type ITypeBranchBody = {
  result: ITypeBranch[];
};

export async function getTypeBranch(): Promise<ITypeBranchBody> {
 const getToken = Reflect.get(JSON.parse(localStorage.getItem('auth')) ,'token')
  const result = await axios.get(`${process.env.REACT_APP_URL}/api/branch`, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
  return Promise.resolve({ result: result.data.result });
}
