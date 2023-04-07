import "antd/dist/antd.css";
import "../styles/vars.css";
import Link from "next/link";
import "../styles/global.css";
import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  MenuOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { Grid, Skeleton, Spin } from "antd";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import { useAtom } from "jotai";
import { authentication } from "src/hook/persistanceData";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useAtom(authentication);
  const Links = [
    { name: "หน้าแรก", link: "/thaworn-ap/home" },
    { name: "แจ้งปัญหา", link: "/thaworn-ap/report" },
    { name: "รายการแจ้งซ่อม", link: "/thaworn-ap/list-report" },
    { name: "จัดการสาขา", link: "/thaworn-ap/branch-management" },
    { name: "จัดการเจ้าหน้าที่", link: "/thaworn-ap/personnel-management" },
    { name: "ออกจากระบบ", link: "/thaworn-ap/login" },
  ];

  const isLogout = (link: string) => {
    if (link === "/thaworn-ap/login") {
      setAuth(undefined);
    }
  };

  const router = useRouter();

  const screen = Grid.useBreakpoint();

  const [open, setOpen] = useState(false);

  const checkAuth =
    !auth &&
    router.pathname !== "/thaworn-ap/login" &&
    router.pathname !== "/thaworn-ap/register";

  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    if (checkAuth) {
      router.push("/thaworn-ap/login");
    }
  }, []);

  if (checkAuth) {
    return <div></div>;
  }

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
                    onClick={() => setOpen(!open)}
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </div>
                ))
              ) : null
            ) : (
              <div className="flex space-x-5">
                {Links.map((link) => (
                  <div key={link.name} className="text-md font-semibold">
                    <a href={link.link} onClick={() => isLogout(link.link)}>
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/*Don't remove*/}
      <div className="bg-gradient-to-b from-blue-200 min-h-screen">
        <div className="mx-5 md:mx-10">
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}
