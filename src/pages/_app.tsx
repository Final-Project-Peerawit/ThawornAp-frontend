import 'antd/dist/antd.css'
import '../styles/vars.css'
import Link from 'next/link'
import '../styles/global.css'
import React, { useState } from 'react';
import { MenuOutlined, UpCircleOutlined } from '@ant-design/icons';
export default function MyApp({ Component, pageProps }) {
  const Links = [
    {name:"Home",link:"/thaworn-ap/home"},
    {name:"Report",link:"/thaworn-ap/report"},
    {name:"Login",link:"/thaworn-ap/login"},
  ];
  const [open,setOpen] = useState(false);
  return (
    <div className="bg-blue-300 w-full h-screen">
      <div className="mb:flex items-center justify-between bg-white md:flex py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
          <span>
    
          </span>
          ThawornAp
        </div>
        <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-2 cursor-pointer md:hidden'>
          <MenuOutlined name={open ? 'close':'menu'} />
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
         bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all 
         duration-500 ease-in ${open ? 'top-100 opacity-100':'top-[-490px]'} md:opacity-100 opacity-0`}>
          {
            Links.map((link) => (
              <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                <Link href={link.link}>{link.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>

    {/*Don't remove*/}
    <div className='w-full p-5'>
        <Component {...pageProps} />
    </div>
      
    </div>
  )
  
}
