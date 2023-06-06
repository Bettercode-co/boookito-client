import React, { useState , useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosInstance } from "../../utils/http";
import Toast from "../Toast/Toast";
import { AiOutlineShareAlt } from "react-icons/ai";
import axios from "axios";
import { route } from "next/dist/server/router";
import { toast } from "react-toastify";
import LogoApplication from "../Home/Logo";

export default function NewPostBook() {
  const [img, setImg] = useState("");
  const [file, setFile] = useState();
  const [desc, setDesc] = useState("");
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [fileUrl, setFileUrl] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const [userBookGram, setUserBookGram] = useState('')

  const router = useRouter();

  useEffect(() => {
    AxiosInstance.get('/user/myprofile',{
      headers : {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(function (res) {
        setUserBookGram(res.data.usernameSocial)
      }).catch(err => err)
  }, [])


  const onImageChange = (e) => {
    setEmpty(false);
    setFile(e.target.files[0]);
    const [file] = e.target.files;
    if (e.target.files.length < 1) {
      setImg("");
    } else {
      setImg(URL.createObjectURL(file));
      // uploadFile();
      const formdata = new FormData();
      formdata.append("file", file);

      if (file) {
        axios
          .post("https://api.boookito.ir/api/v2/uploader", formdata, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`
            },
          })
          .then((res) => {
            setFileUrl(res.data.url);
          });
      } else {
      }
    }
  };

  const submitHandler = (e) => {
    if(!userBookGram){
      toast.error('ابتدا نام کاربری کتابگرام خود را وارد نمایید.',{autoClose:3000})
      router.push('/user/account')
    }else{
      e.preventDefault();
      AxiosInstance.post(
        "/user/newpost",
        { title:desc , mediaSource:fileUrl },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      ).then(res=>{
        setEmpty(false)
          setSuccess(res.data.success)
          setTimeout(() => {
            router.push('/bookgram')
          }, 2000);
      }).catch(e=>{
        setEmpty(true)
      });
    };
    }
   

  return (
    <>
      {error && <Toast type="error" message="لطفا وارد حساب کاربری خود شوید" />}
      {success && <Toast type="success" message="پست شما با موفقیت ثبت شد" />}
      <div className="md:px-2 px-0 md:mb-4">
        <form
          onSubmit={submitHandler}
          className="max-w-md mx-auto dark:bg-gray-700 bg-gray-100 p-4 rounded-lg overflow-hidden md:max-w-2xl md:mt-10"
        >
          <div className="md:flex">
            <div className="w-full ">
            <LogoApplication/>
              <div className="p-3">
                <div className="mb-4">
                  <span> رسانه </span>
                  <div className="relative mt-2 h-80 rounded-lg border-dashed dark:bg-gray-700 border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                    <div className="absolute">
                      <div className="flex flex-col items-center ">
                        <i className="fa fa-cloud-upload fa-3x text-gray-200 " />{" "}
                        <img className=" w-[115px] rounded-lg" src={img} />{" "}
                        {img.length == 0 ? (
                          <>
                            <span className="block text-gray-400  text-xs">
                              عکس خود را از گالری انتخاب کنید
                            </span>
                          </>
                        ) : (
                          <span className="block text-gray-400 font-normal">
                            برای تغییر عکس ضربه بزنید
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="h-full w-full opacity-0 "
                      onChange={onImageChange}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm">توضیحات</span>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    id="message"
                    rows="4"
                    className="scroll-auto block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="توضیحاتی راجب پست جدیدت بهمون بگو..."
                  ></textarea>
                </div>
                {empty ? (
                  <p className="text-rose-500 text-sm text-center">
                    توضیحات یا عکس نمیتواند خالی باشد
                  </p>
                ) : (
                  ""
                )}
                <div className="mt-10 text-left pb-3" dir="ltr">
                  <button
                    type="submit"
                    className="disabled  text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
                  >
                    <AiOutlineShareAlt size={20} />
                    انتشار
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
