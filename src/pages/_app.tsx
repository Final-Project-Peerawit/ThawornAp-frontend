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
import { QueryClientProvider, QueryClient } from "react-query";

export default function MyApp({ Component, pageProps }) {
  const Links = [
    { name: "หน้าแรก", link: "/thaworn-ap/home" },
    { name: "แจ้งปัญหา", link: "/thaworn-ap/report" },
    { name: "รายการแจ้งซ่อม", link: "/thaworn-ap/list-report" },
    { name: "จัดการสาขา", link: "/thaworn-ap/branch-management" },
    { name: "จัดการเจ้าหน้าที่", link: "/thaworn-ap/personnel-management" },
    { name: "ออกจากระบบ", link: "/thaworn-ap/list-report" },
  ];

  const screen = Grid.useBreakpoint();

  const [open, setOpen] = useState(false);

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <div className=" w-full">
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
        {/* <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
         bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all 
         duration-500 ease-in ${open ? 'top-100 opacity-100':'top-[-490px]'} md:opacity-50 opacity-0`}>
          {
            Links.map((link) => (
              <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                <Link href={link.link}>{link.name}</Link>
              </li>
            ))
          }
        </ul> */}
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
