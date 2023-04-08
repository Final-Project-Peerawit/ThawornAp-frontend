import { atomWithStorage } from "jotai/utils";

export type IAuth ={
  token : string,
  branch_id:number
}

export const authentication = atomWithStorage<IAuth | undefined>(
  "auth",
  undefined
);





