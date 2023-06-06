import React, { useState } from "react";
import { AxiosInstance } from "../../utils/http/index";
import Toast from "../Toast/Toast";
import { useRouter } from "next/router";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Image from "next/image";
export default function SinglePost(props) {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(props.islike);
  

  const [countLike, setCountLike] = useState(props.likes);

  function getComment(postid) {
    setError(false);
    AxiosInstance.get(`/user/comments/${postid}/1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(function (res) {
      setComment(res.data.result);
    });
  }

  const postComments = () => {
    setError(false);
    setEmpty(false);
    AxiosInstance.get("/user/checkusername", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          newComment.trim().length > 0
            ? AxiosInstance.post(
                "/user/newcomment",
                {
                  postId: props.id,
                  comment: newComment,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
                .then((response) => {
                  const commentToAdd = { comment: newComment };
                  setNewComment("");
                  setSuccess(true);
                })
                .catch((err) => {
                  setError(true);
                  localStorage.clear();
                  setSuccess(false);
                  setNewComment("");
                })
            : setEmpty(true);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        setTimeout(() => {
          router.push("/login");
        }, 1800);
      });
  };

  const liekPost = () => {
    AxiosInstance.post(
      "/user/newlike",
      { postId: props.id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        if (res.data.success) {
          if (res.data.like) {
            setIsLiked(true);
            setCountLike(countLike + 1);
          } else if (res.data.dislike) {
            setIsLiked(false);
            setCountLike(countLike - 1);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {empty && <Toast type="error" message="این متن نمیتواند خالی باشد." />}
      {error && <Toast type="error" message="لطفا وارد حساب کاربری خود شوید" />}
      {success && <Toast type="success" message="کامنت شما با موفقیت ثبت شد" />}

      <div className="bg-gray-50 shadow-xl col-span-12 md:col-span-7 md:col-start-3 dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-3xl">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image width={28} height={28} src={props.profilepic} className="h-7 w-7 rounded-full" loading="lazy" />
           
            <div className="ml-1.5 text-sm leading-tight">
              <span className="text-black dark:text-white font-bold block text-xs ">
                @{props.username}
              </span>
            </div>
          </div>
        </div>
        <br />
<Image src={props.source} width={1000} height={500} className="mt-3 rounded-lg border border-gray-100 dark:border-gray-700 w-full md:w-80 mx-auto"/>
  
        <p
          className="text-black dark:text-white block text-xs  mt-4    leading-relaxed text-justify"
          dir="rtl"
        >
          {" "}
          {props.desc}{" "}
        </p>
        <div className="inline-flex">
          {isLiked !== true ? (
            <div className="mr-1">
              <AiOutlineLike onClick={liekPost} size={23} />
              <p className="text-center text-xs mt-3">{countLike} likes</p>
            </div>
          ) : (
            <div className="mr-1">
              <AiFillLike size={23} onClick={liekPost} />
              <p className="text-center text-xs mt-3">{countLike} likes</p>
            </div>
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-[8px] py-1 ">
          {props.createdat}
        </p>
      </div>
    </>
  );
}
