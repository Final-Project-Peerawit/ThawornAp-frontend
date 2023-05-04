export type ItypeFix = {
  type_place_id: number;
  type_fix_id: number;
  type_fix_name: string;
  is_active: string;
  create_dt: string;
};

export type ITypeFixBody = {
  result: ItypeFix[];
};

const mockData: ItypeFix[] = [
  {
    type_place_id: 1,
    type_fix_id: 1,
    type_fix_name: "เตียง",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 2,
    type_fix_name: "ตู้เสื้อผ้า",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 3,
    type_fix_name: "โต๊ะ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 4,
    type_fix_name: "เก้าอี้",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 5,
    type_fix_name: "หลอดไฟ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 6,
    type_fix_name: "แอร์",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 7,
    type_fix_name: "กระจก",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 8,
    type_fix_name: "หน้าต่าง",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 9,
    type_fix_name: "โคมไฟ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 1,
    type_fix_id: 10,
    type_fix_name: "ประตู",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 2,
    type_fix_id: 11,
    type_fix_name: "ฝักบัว",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 2,
    type_fix_id: 12,
    type_fix_name: "สายชำระ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 2,
    type_fix_id: 13,
    type_fix_name: "เครื่องทำน้ำอุ่น",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 2,
    type_fix_id: 14,
    type_fix_name: "อ่างล้างมือ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 2,
    type_fix_id: 15,
    type_fix_name: "ท่อน้ำ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 2,
    type_fix_id: 16,
    type_fix_name: "โถสุขภัณฑ์",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 3,
    type_fix_id: 17,
    type_fix_name: "ราวตากผ้า",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 3,
    type_fix_id: 18,
    type_fix_name: "ก๊อกน้ำ",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
  {
    type_place_id: 3,
    type_fix_id: 19,
    type_fix_name: "ท่อน้ำทิ้ง",
    is_active: "y",
    create_dt: "2022-01-01 11:00",
  },
];

export function getTypeFix(placeId: number): Promise<ITypeFixBody> {
  const normalResult = mockData.filter(
    (item) => item.type_place_id === placeId
  );

  return Promise.resolve({ result: normalResult });
}
