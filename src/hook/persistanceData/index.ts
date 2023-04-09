import { atomWithStorage } from "jotai/utils";

export type IAuth ={
  token : string,
  branch_id:number,
  role_id: number
  room_number:number
}

export const authentication = atomWithStorage<IAuth | undefined>(
  "auth",
  undefined
);





