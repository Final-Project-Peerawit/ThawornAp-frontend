import {
  ExportOutlined,
  FileAddOutlined,
  FundOutlined,
  HomeOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMenuList } from "src/dataService/api_menu/get";

export type Imenu = {
  key: number;
  icon: React.ReactNode;
  label: string;
  link: string;
};

export default function useMyApp() {
  const [normalData, setNormalData] = useState();
  const { data, isLoading } = useQuery({
    queryKey: ["menu_list"],
    queryFn: async () => getMenuList(),
  });

  const menu = [
    {
      key: 1,
      icon: <HomeOutlined />,
      label: "หน้าแรก",
      link: "/thaworn-ap/home",
    },
    {
      key: 2,
      icon: <FileAddOutlined />,
      label: "แจ้งปัญหา",
      link: "/thaworn-ap/report",
    },
    {
      key: 3,
      icon: <SolutionOutlined />,
      label: "รายการแจ้งซ่อม",
      link: "/thaworn-ap/list-report",
    },
    {
      key: 4,
      icon: <FundOutlined />,
      label: "จัดการสาขา",
      link: "/thaworn-ap/branch-management",
    },
    {
      key: 5,
      icon: <TeamOutlined />,
      label: "จัดการเจ้าหน้าที่",
      link: "/thaworn-ap/personnel-management",
    },
    {
      key: 6,
      icon: <ExportOutlined />,
      label: "ออกจากระบบ",
      link: "/thaworn-ap/login",
    },
  ];

  useEffect(() => {
    const normal = data.result.map((item) =>
      menu.find((m) => {
        if (m.key === item.function_id) {
          return {
            key: item.function_id,
            icon: m.icon,
            label: item.function_name_th,
            link: m.link,
          };
        }
      })
    );
  }, [data.result]);

  return { menu };
}
