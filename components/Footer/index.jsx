import Link from "next/link";
import { useEffect, useState } from "react";
import {TbBrandInstagram, TbSmartHome,TbUser,TbLogin} from 'react-icons/tb'
export default function footer() {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setHasLoggedIn(true);
      } else {
        setHasLoggedIn(false);
      }
    }, [localStorage.getItem("token")]);
  }
  return (
    <>
      <div className="w-full h-20 lg:hidden md:hidden">
        <section
          id="bottom-navigation"
          className="block h-14 fixed inset-x-0 dark:bg-gray-800 dark:border-t-0 bottom-0 z-10 bg-white shadow border-t-2  "
        >
          <div id="tabs" className="flex justify-between">
            <Link href="/">
              <a className="w-full  focus:text-green-500 focus:border-t-2 border-green-500  hover:text-green-500 justify-center inline-block text-center pt-2 pb-1">
                <TbSmartHome className="mx-auto mb-1 text-green-500" size={25 }/>
                <span className=" block text-[11px]">خانه</span>
              </a>
            </Link>


            {hasLoggedIn ? (
              <Link href="/user/dashboard">
                <a
                  href="#"
                  className="w-full focus:text-green-500 focus:border-t-2 border-green-500 justify-center inline-block text-center pt-2 pb-1"
                >
                  <TbUser size={25} className="mx-auto mb-1 text-green-500"/>
                  <span className=" block text-[11px]">پروفایل</span>
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a
                  href="#"
                  className="w-full focus:text-green-500 focus:border-t-2 border-green-500 justify-center inline-block text-center pt-2 pb-1"
                >
                <TbLogin size={25} className="mx-auto mb-1 text-green-500"/>


                  <span className=" block text-xs">ورود به حساب</span>
                </a>
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
