import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const authentication = atomWithStorage<string | undefined>(
  "auth",
  undefined
  //   sessionStorage
);
