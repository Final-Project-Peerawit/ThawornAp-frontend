import "antd/dist/antd.css";
import "../styles/vars.css";
import Link from "next/link";
import "../styles/global.css";
import React, { useState } from "react";
import {
  CloseOutlined,
  MenuOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { Grid } from "antd";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";

export default function MyApp({ Component, pageProps }) {
  const Links = [
    { name: "หน้าแรก", link: "/thaworn-ap/home" },
    { name: "แจ้งปัญหา", link: "/thaworn-ap/report" },
    { name: "รายการแจ้งซ่อม", link: "/thaworn-ap/list-report" },
    { name: "จัดการสาขา", link: "/thaworn-ap/branch-management" },
    { name: "จัดการเจ้าหน้าที่", link: "/thaworn-ap/personnel-management" },
    { name: "ออกจากระบบ", link: "/thaworn-ap/" },
  ];

  const screen = Grid.useBreakpoint();

  const [open, setOpen] = useState(false);

  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  return (
    <div className=" w-full">
      {router.pathname === "/thaworn-ap/register" ||
      router.pathname === "/thaworn-ap/login" ? null : (
        <div
          className="mb:flex items-center justify-between md:flex py-4 md:px-10 px-7"
          style={{ backgroundColor: "#FEA929" }}
        >
          <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
            <span></span>
            ThawornAp
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-2 cursor-pointer md:hidden"
          >
            {!open ? <MenuOutlined /> : <CloseOutlined />}
          </div>
          <div>
            {!screen.md ? (
              open ? (
                Links.map((link) => (
                  <div
                    key={link.name}
                    className="md:ml-8 text-xl md:my-0 mt-2 p-3 border-b border-gray-300 flex justify-center"
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </div>
                ))
              ) : null
            ) : (
              <div className="flex space-x-5">
                {Links.map((link) => (
                  <div key={link.name} className="text-md font-semibold">
                    <Link href={link.link}>{link.name}</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/*Don't remove*/}
      <div className="w-full h-screen">
        <div className="mx-5 md:mx-10 h-screen">
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}
