import { useEffect, useRef, useState } from "react";
import { AxiosInstance } from "../../utils/http";
import Toast from "../Toast/Toast";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [accountdata, setAccountData] = useState({});
  const [userBookGram, setUserBookGram] = useState("");
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [empty, setEmpty] = useState(false);
  const [minlengthError, setMinlengthError] = useState(false);
  const [successChange, setsuccessChange] = useState(false);
  const [img, setImg] = useState("");

  const bookgramInput = useRef();

  useEffect(() => {
    AxiosInstance.get("/user/myprofile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (res) {
        setAccountData(res.data);
        setUserBookGram(res.data.usernameSocial);
      })
      .catch((err) => err);
  }, [file, accountdata.username_bookgram]);

  useEffect(() => {
    bookgramInput.current.focus();
  }, []);

  const changeUsername = async (e) => {
    setsuccessChange(false);
    setEmpty(false);
    e.preventDefault();
    try {
      if (userBookGram.trim().length < 5) {
        setMinlengthError(true);
      } else if (userBookGram.trim().length > 0) {
        await AxiosInstance.post(
          "user/changeusername",
          { usernameSocial: userBookGram },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ).then((res) => {
          setMinlengthError(false);
          setsuccessChange(true);
        });
      } else {
        setEmpty(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
    const [file] = e.target.files;
    if (e.target.files.length < 1) {
      setImg("");
    } else {
      setImg(URL.createObjectURL(file));
      const formdata = new FormData();
      formdata.append("file", file);
      if (file) {
        axios
          .post("https://api.boookito.ir/api/v2/uploader",formdata, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setFileUrl(res.data.url);
          });
      } else {
      }
    }
  };

  // const changeBGUserName = async (e) => {
  //   const formData = new FormData()
  //   e.preventDefault();
  //   formData.append("file", file)
  //   try {
  //     await AxiosInstance.post('/updateuser', formData, {
  //       headers: {
  //         "auth-token": localStorage.getItem("token"),
  //         "Content-Type": "multipart/form-data"
  //       }
  //     })
  //     setFile()
  //     setFileName('')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    AxiosInstance.post('/user/changeavatar',{src:fileUrl},{
      headers:{ Authorization: `Bearer ${localStorage.getItem("token") }`,
    }
    }).then(res=>{
      toast.success('پروفایل شما با موفقیت تغییر کرد',{autoClose:2100})
    }).catch(e=>console.log(e))
  };

  return (
    <>
      {successChange && (
        <Toast type="success" message="نام کاربری با موفقیت تغییر کرد" />
      )}
      <div className=" md:mt-10 max-w-4xl mx-auto md:mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-xl px-4">
        <div className="flex flex-col  ">
          <form
            className="mb-10 "
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className=" mt-8 md:h-auto flex flex-col justify-center items-center ">
              <div className="w-24 h-24 mb-5  ">
                <img
                  loading="lazy"
                  className="w-full p-1  border-2 border-green-500  h-full rounded-full shadow-lg"
                  src={img ? img : accountdata.avatarSource}
                  alt="Bonnie image"
                />
              </div>

              {file ? (
                <label className="cursor-pointer">
                  <button
                    type="submit"
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-green-400 rounded-lg border border-gray-200 hover:bg-green-600 hover:text-white focus:z-10 focus:ring-4 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    ثبت تغییرات
                  </button>
                </label>
              ) : (
                <label className="cursor-pointer">
                  <span className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    ویرایش عکس پروفایل
                  </span>
                  <input
                    onChange={uploadFile}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
              )}
            </div>
          </form>
          <form onSubmit={changeUsername}>
            <div className="w-full  ">
              <section className="md:flex  w-full md:gap-x-6 md:mb-6 mb-0 justify-between items-center">
                <div className="w-full mb-3 md:mb-0">
                  <label className="block text-sm ">نام</label>
                  <input
                    disabled
                    value={accountdata.firstname}
                    autoComplete="off"
                    type="text"
                    id="base-input"
                    className="mt-2 border  border-gray-300  text-[13px] text-gray-900 text-md rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  />
                </div>
                <div className="w-full mb-3 md:mb-0">
                  <label className="block text-sm ">نام خانوادگی</label>
                  <input
                    disabled
                    value={accountdata.lastname}
                    autoComplete="off"
                    type="text"
                    id="base-input"
                    className="mt-2 text-md border  border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  />
                </div>
              </section>

              <section className="md:flex  w-full md:gap-x-6 md:mb-6 mb-0  justify-between items-center">
                <div className="w-full mb-3 md:mb-0">
                  <label className="block text-sm  ">شماره همراه</label>
                  <div className="relative mt-2" dir="ltr">
                    <div className="flex absolute inset-y-0 right-0 items-center pl-3 pointer-events-none px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      autoComplete="off"
                      disabled
                      value={accountdata.phoneNumber}
                      type="text"
                      id="email-adress-icon"
                      className="  text-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="w-full mb-3 md:mb-0">
                  <label className="block text-sm ">شماره دانشجویی</label>
                  <input
                    disabled
                    value={accountdata.studentId}
                    autoComplete="off"
                    placeholder="شماره دانشجویی"
                    type="text"
                    id="base-input"
                    className="text-left  mt-2 border text-[13px]  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  />
                </div>
              </section>

              <section className="md:flex md:mb-6 mb-0   w-full md:gap-x-6 justify-between items-center">
                <div className="w-full mb-3 md:mb-0">
                  <label className="block text-sm ">کدملی</label>
                  <input
                    disabled
                    value={accountdata.username}
                    placeholder="کدملی"
                    autoComplete="off"
                    type="text"
                    id="base-input"
                    className="mt-2 border  text-left  border-gray-300 text-[13px] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm ">نام کاربری کتابگرام</label>
                  <input
                    ref={bookgramInput}
                    value={userBookGram}
                    onChange={(e) => setUserBookGram(e.target.value)}
                    placeholder="@"
                    dir="ltr"
                    autoComplete="off"
                    type="text"
                    className="mt-2 text-left border    border-gray-300 text-[13px] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  />
                </div>
              </section>
            </div>
            {empty ? (
              <p className="text-rose-500 text-sm text-center mt-2">
                نام کاربری نمیتواند خالی باشد
              </p>
            ) : (
              ""
            )}
            {minlengthError ? (
              <p className="text-rose-500 text-sm text-center mt-2">
                نام کاربری باید حداقل 5 کاراکتر باشد
              </p>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="mb-8 block w-full md:w-44 mx-auto px-4 py-2 mt-8 md:mt-12 text-sm font-medium leading-5 text-center text-white transition-colors duration-150  bg-green-500 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
              href="#"
            >
              ثبت تغییرات
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
