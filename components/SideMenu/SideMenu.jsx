import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { HomeIcon, UserIcon, UserAddIcon } from "@heroicons/react/outline";
import { AiOutlineInstagram } from "react-icons/ai";
import LogoApplication from "../Home/Logo";

const SideMenu = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const router = useRouter();

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
    <section className="mt-10 flex flex-col px-8 ">
      <div className="flex flex-col justify-center items-center">
        <LogoApplication />
        <h1 className="mt-5">کتابخانه دانشگاه فنی حرفه ای استان مرکزی</h1>
      </div>

      <div className="bg-green-600 my-6  border-b border-green-500 shadow-xl "></div>

      <div id="" className=" flex flex-col  ">
        <Link href="/">
          <a
            className={classNames(
              "py-3 mb-3 flex items-center rounded-2xl  px-8",
              router.pathname == "/" && "bg-green-600 text-white"
            )}
          >
            <HomeIcon className="w-6 h-6 stroke-current" />
            <span className=" block text-lg mr-2">خانه</span>
          </a>
        </Link>

        <Link href="/bookgram">
          <a
            className={classNames(
              "py-3 mb-3 flex items-center rounded-2xl  px-8",
              router.pathname == "/bookgram" && "bg-green-600 text-white"
            )}
          >
            <AiOutlineInstagram className="h-6 w-6 stroke-current" />
            <span className=" block text-lg mr-2">بوک گرام</span>
          </a>
        </Link>

        {hasLoggedIn ? (
          <Link href="/user/dashboard">
            <a
              className={classNames(
                "py-3 mb-3 flex items-center rounded-2xl  px-8",
                router.pathname == "/user/dashboard" && "bg-green-600 text-white"
              )}
            >
              <UserIcon className="h-6 w-6 stroke-current" />
              <span className=" block text-lg mr-2">پروفایل</span>
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a
              className={classNames(
                "py-3 mb-3 flex items-center rounded-2xl  px-8",
                router.pathname == "/login" && "bg-green-600 text-white"
              )}
            >
              <UserIcon className="h-6 w-6 stroke-current" />
              <span className=" block text-lg mr-2">ورود به حساب</span>
            </a>
          </Link>
        )}
      </div>

      <div>
        <a href="https://markazi-tvu.ac.ir/">
          <img
            className="rounded-lg w-16 absolute bottom-0 left-0 right-0 mx-auto mb-10  w-32  justify-center"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/TVU_logo.svg/1200px-TVU_logo.svg.png"
            alt=""
          />
        </a>
      </div>
    </section>
  );
};

export default SideMenu;
