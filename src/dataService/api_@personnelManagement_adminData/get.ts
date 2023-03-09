export type IAdminData = {
  user_id: number;
  name_surname: string;
  branch: string;
  phone_contact: string;
  email: string;
  modify_user_data: string;
};

export type IAdminDataBody = {
  result: IAdminData[];
};

const mockData: IAdminData[] = [
  {
    user_id: 775,
    name_surname: "สมศักด์ จริงจริง",
    branch: "ลาดพร้าว71",
    phone_contact: "0877544454",
    email: "myemail@gmail.com",
    modify_user_data: "แก้ไข",
  },
  {
    user_id: 776,
    name_surname: "สมปอง จริงใจ",
    branch: "ลาดพร้าว78",
    phone_contact: "0678945612",
    email: "myhotmail@gmail.com",
    modify_user_data: "แก้ไข",
  },
  {
    user_id: 777,
    name_surname: "สมชาย จุจุ",
    branch: "ลาดพร้าว71",
    phone_contact: "0811111111",
    email: "mynameis@gmail.com",
    modify_user_data: "แก้ไข",
  },
  {
    user_id: 778,
    name_surname: "สมหญิง จุจุ",
    branch: "ลาดกระบัง",
    phone_contact: "0811111111",
    email: "mynameis@gmail.com",
    modify_user_data: "แก้ไข",
  },
];

export function getIAdminData(): Promise<IAdminDataBody> {
  return Promise.resolve({ result: mockData });
}
