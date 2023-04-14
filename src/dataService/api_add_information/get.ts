export type IAddformation = {
  id: number;
  title: string;
  description: string;
  picture: string | null;
  isActive: boolean;
  create_dt: string;
};

export type IGetInformationBody = {
  result: IAddformation[];
};

export function getInformation(): Promise<IGetInformationBody> {
  const mock: IAddformation[] = [
    {
      id: 1,
      title: "แจ้งปิดปรับปรุงการใช้น้ำ (สาขาลาดพร้าว 71)",
      picture:
        "https://www.matichon.co.th/wp-content/uploads/2017/03/11-%E0%B8%A1%E0%B8%B5%E0%B8%84-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B9%84%E0%B8%AB%E0%B8%A5%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%99-%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%B5%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5.jpg",
      description:
        "เนื่องจากทางหอพักจะทำการซ่อมบำรุงท่อนำจึงขอให้งดใช้น้ำช่วง วันที่ 20 เมษายน 2566 เวลา 10.00-12.00 จึงเรียนมาเพื่อทราบ",
      isActive: true,
      create_dt: "2022-01-15 11:00",
    },
    {
      id: 2,
      title: "แจ้งปิดปรับปรุงการใช้ไฟฟ้า (สาขาลาดพร้าว 68)",
      picture:
        "https://www.thailandplus.tv/wp-content/uploads/2022/10/Poster-50x70-cm.jpg",
      description:
        "เนื่องจากทางหอพักจะทำการซ่อมบำรุงสายไฟจึงขอให้งดใช้น้ำช่วง วันที่ 21 เมษายน 2566 เวลา 10.00-12.00 จึงเรียนมาเพื่อทราบ",
      isActive: true,
      create_dt: "2022-01-15 11:00",
    },
    {
      id: 4,
      title: "แจ้งปิดปรับปรุงการใช้น้ำ (สาขาลาดพร้าว 71)",
      picture:
        "https://www.matichon.co.th/wp-content/uploads/2017/03/11-%E0%B8%A1%E0%B8%B5%E0%B8%84-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B9%84%E0%B8%AB%E0%B8%A5%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%99-%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%B5%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5.jpg",
      description:
        "เนื่องจากทางหอพักจะทำการซ่อมบำรุงท่อนำจึงขอให้งดใช้น้ำช่วง วันที่ 20 เมษายน 2566 เวลา 10.00-12.00 จึงเรียนมาเพื่อทราบ",
      isActive: true,
      create_dt: "2022-01-15 11:00",
    },
    {
      id: 5,
      title: "แจ้งปิดปรับปรุงการใช้ไฟฟ้า (สาขาลาดพร้าว 68)",
      picture:
        "https://www.thailandplus.tv/wp-content/uploads/2022/10/Poster-50x70-cm.jpg",
      description:
        "เนื่องจากทางหอพักจะทำการซ่อมบำรุงสายไฟจึงขอให้งดใช้น้ำช่วง วันที่ 21 เมษายน 2566 เวลา 10.00-12.00 จึงเรียนมาเพื่อทราบ",
      isActive: true,
      create_dt: "2022-01-15 11:00",
    },
  ];
  return Promise.resolve({ result: mock });
}
