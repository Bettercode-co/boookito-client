import { useEffect, useState } from "react";
import { AxiosInstance } from "../../utils/http";

export default function EditProfile() {
  const [accountdata, setAccountData] = useState({});

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
  }, []);

  return (
    <>
      <div className=" md:mt-10 max-w-4xl mx-auto md:mb-8 bg-white  rounded-lg shadow-xl px-4">
        <div className="flex flex-col  ">
          <form className="mb-10 ">
            <div className=" mt-8 md:h-auto flex flex-col justify-center items-center ">
              <div className="w-24 h-24 mb-5  ">
                <img
                  loading="lazy"
                  className="w-full p-1  border-2 border-green-500  h-full rounded-full shadow-lg"
                  src="/images/user.svg"
                  alt="Bonnie image"
                />
              </div>
            </div>
          </form>

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
                  className="mt-2 border  border-gray-300  text-[13px] text-gray-900 text-md rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 "
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
                  className="mt-2 text-md border  border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 "
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
                    className="  text-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full  p-4  "
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
                  className="text-left  mt-2 border text-[13px]  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 "
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
                  className="mt-2 border  text-left  border-gray-300 text-[13px] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-4 "
                />
              </div>
            </section>
          </div>

          <button className="mb-8 block w-full  mx-auto px-4 py-2 mt-8 md:mt-12 text-sm font-medium leading-5 text-center text-white transition-colors duration-150  bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
            در صورت هرگونه مغایرت اطلاعات به مسئول کتابخانه مراجعه فرمایید
          </button>
        </div>
      </div>
    </>
  );
}
