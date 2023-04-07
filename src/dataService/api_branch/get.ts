// import axios from "axios";
// import { useAtom } from "jotai";
// import { authentication } from "src/hook/persistanceData";

// export type ITypeBranch = {
//   branch_id: number;
//   branch_name: string;
//   active: string;
//   create_dt: string;
// };

// export type ITypeBranchBody = {
//   result: ITypeBranch[];
// };

// export async function getTypeBranch(): Promise<ITypeBranchBody> {
//   const [auth] = useAtom(authentication);
//   console.log("auth:", auth);
//   const config = {
//     headers: {
//       Authorization: `Bearer ${auth}`,
//     },
//   };
//   const result = await axios.get(
//     `${process.env.REACT_APP_URL}/api/branch`,
//     config
//   );
//   return Promise.resolve({ result: result.data.result });
// }

import axios from "axios";
import { useAtom } from "jotai";
import { authentication } from "src/hook/persistanceData";

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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxrbmJjdkBnbWFpbC5jb20iLCJyb2xlX2lkIjoyLCJsb2dpbl9pZCI6ImFiYzc5MGQzLWE2OTYtNDRmMC1hMzc0LTM4NTEzMmI5N2I4YiIsImlhdCI6MTY4MDg2NTkyMCwiZXhwIjoxNjgwODY5NTIwfQ.PcYnBQ-2JVpY5lAU8tzqDPnhGQcj58OTQwjlXNBTYQA";
  const result = await axios.get(`${process.env.REACT_APP_URL}/api/branch`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Promise.resolve({ result: result.data.result });
}
