import { useState, useEffect } from "react";
import Link from "next/dist/client/link";
import { AxiosInstance } from "../../utils/http";
import { useRouter } from "next/router";
import {BiUser,BiPlus} from 'react-icons/bi'
import {AiOutlineArrowLeft,AiOutlineLock} from 'react-icons/ai'
import {CiLogout} from 'react-icons/ci'
import {MdOutlineArticle, MdOutlineManageSearch} from 'react-icons/md'
import {CiBoxList} from 'react-icons/ci'
import {BsShare} from 'react-icons/bs'
export default function dashboard() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);
  const router = useRouter();
  

  const handleExit = () => {
    localStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      AxiosInstance.get("/user/myprofile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          setError(true);
          localStorage.clear();
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        });
    } else {
      console.log("You are on the server");
    }
  }, [router]);
  const items=[
    {title:'اطلاعات حساب کاربری',href:'/user/account',icon:<BiUser size={25} color="#22c55e"/>  },
    {title:'لیست امانات',href:'/user/myreserved',icon:<CiBoxList size={25} color="#22c55e"/>  },
    {title:'بوکگرام',href:'/bookgram',icon:<BsShare size={25} color="#22c55e"/>  },
    {title:'افزودن پست',href:'/user/newpost',icon:<BiPlus size={25} color="#22c55e"/>  },
    {title:'مدیریت پست ها',href:'/user/management',icon:<MdOutlineManageSearch size={25} color="#22c55e"/>  },
    {title:'تغییر رمز عبور',href:'/user/changepassword',icon:<AiOutlineLock size={25} color="#22c55e"/>  },
    {title:'سرویس مگیران',href:'https://magiran.com/',icon:<MdOutlineArticle size={25} color="#22c55e"/>  },
    {title:'خروج از حساب کاربری',href:'/user/logout',icon:  <CiLogout color="#ff0000" size={25}/>  },

    
  ]
  return (
    <>
      {error ? (
        <p>شما باید لاگین کنید</p>
      ) : (
        <div className="mt-6 mx-4 p-4 md:mb-8 bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-6 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
            کاربر {userData.firstname} {userData.lastname} خوش آمدید
          </h5>
          <p className="text-sm md:text-base font-normal mb-6 text-gray-500 dark:text-gray-400 mt-5">
            {" "}
            حساب کاربری{" "}
          </p>
          <ul className="my-4 gap-4 md:gap-8 grid md:grid-cols-5  ">
            {items.map((value,index)=>{
              return <li key={index}>
              <Link href={value.href}>
                 <a className="flex md:flex-col items-center px-3 py-5 text-sm md:text-base   text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                 {value.icon}
                   <span className="flex-1 ml-3 md:ml-0  whitespace-nowrap pr-5 md:pr-0 md:my-2">
                     {value.title}
                   </span>
                   <AiOutlineArrowLeft className="lg:hidden" size={25}/>
                 </a>
              </Link>
             </li>
            })}
            

        

           
          </ul>
        </div>
      )}
    </>
  );
}
