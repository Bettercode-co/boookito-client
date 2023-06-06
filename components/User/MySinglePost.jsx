import { useState } from "react";
import { AxiosInstance } from "../../utils/http";
import Toast from "../Toast/Toast";
import {  AiFillLike } from "react-icons/ai";

export default function MyPost(props) {
  const [success, setSuccess] = useState(false);
  const [wrong, setWrong] = useState(false);

  const deletePost = () => {
    setSuccess(false);
    setWrong(false);
    AxiosInstance.post(
      "/deletemypost",
      { postId: props.id },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        setSuccess(true);
        props.setPosts(res.data.result);
      })
      .catch((err) => {
        setWrong(true);
      });
  };

  return (
    <>
      {success && <Toast type="success" message="پست شما با موفقیت حذف شد" />}
      {wrong && <Toast type="error" message="پست شما حذف نشد" />}
     
        <div className="bg-gray-50 shadow-lg col-span-12 md:col-span-7 md:col-start-4  dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-2xl  ">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="h-8 w-8 md:h-12 md:w-12  rounded-full"
                src={props.profilepic}
                loading="lazy"
              />
              <div className="ml-1.5 text-sm leading-tight">
                <span className="text-black dark:text-white font-bold block text-xs md:text-sm ">
                  Me
                </span>
              </div>
            </div>
            <button
              onClick={deletePost}
              type="button"
              className=" border border-rose-500  he focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                xmlSpace="preserve"
                enableBackground="new 0 0 64 64"
              >
                <path
                  d="M-207.5-205.1h3v24h-3zM-201.5-205.1h3v24h-3zM-195.5-205.1h3v24h-3zM-219.5-214.1h39v3h-39z"
                  transform="translate(232 228)"
                  fill="#d9326d"
                  className="fill-134563"
                />
                <path
                  d="M-192.6-212.6h-2.8v-3c0-.9-.7-1.6-1.6-1.6h-6c-.9 0-1.6.7-1.6 1.6v3h-2.8v-3c0-2.4 2-4.4 4.4-4.4h6c2.4 0 4.4 2 4.4 4.4v3"
                  transform="translate(232 228)"
                  fill="#d9326d"
                  className="fill-134563"
                />
                <path
                  d="M-191-172.1h-18c-2.4 0-4.5-2-4.7-4.4l-2.8-36 3-.2 2.8 36c.1.9.9 1.6 1.7 1.6h18c.9 0 1.7-.8 1.7-1.6l2.8-36 3 .2-2.8 36c-.2 2.5-2.3 4.4-4.7 4.4"
                  transform="translate(232 228)"
                  fill="#d9326d"
                  className="fill-134563"
                />
              </svg>
            </button>{" "}
          </div>
          <p
            className="text-black dark:text-white block text-sm py-4  mt-4 leading-relaxed text-justify"
            dir="rtl"
          >
            {" "}
            {props.desc}{" "}
          </p>
          <img
            className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 mx-auto w-full md:w-72"
            src={props.source}
            loading="lazy"
          />
          <p className="text-gray-500 dark:text-gray-400 text-[14px] py-1 my-3">
            {props.createdt}
          </p>
          <div className="inline-flex">
            <div className="mr-1">
              <AiFillLike size={23} />

              <p className="text-center text-xs md:text-sm mt-3">{props.likes} likes</p>
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400 flex ">
            <div className="flex items-center mr-6">
              <div style={{ width: "1.3rem" }}></div>
              <span className="ml-3"></span>
            </div>
          </div>
        </div>
    </>
  );
}
